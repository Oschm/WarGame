const url = process.env.MONGO_URL; // Connection URL
const Monk = require('monk');
const db = Monk(url);
var _ = require('lodash');

db.on('timeout', () => {
    console.log("timeout");
})

if (!db) {
    console.log('no connection')
}

var Game = {};
const GameCollection = db.get('Game');

const Joi = require('joi');
const {
    size,
    filter,
    join
} = require('lodash');
const {
    default: monk
} = require('monk');

//user1 not required because it is set by backend
const gameSchema = Joi.object({
    "user1": Joi.string(),
    "user2": Joi.string(),
    "playerHealth": Joi.number().integer().default(3),
    "startedTime": Joi.date().default(function () {
        return new Date();
    }),
    "endTime": Joi.date(),
    "invitationPending": Joi.boolean().default(true),
    "gameOver": Joi.boolean().default(false),
    "winner": Joi.string().default(null),
    "rounds": Joi.array().default([]),
});

Game.validate = async function (gameObject) {
    return await gameSchema.validateAsync(gameObject);

};

Game.create = async function (data) {
    try {
        console.log(`create Game in DB: ${JSON.stringify(data)}`);
        data.user1 = Monk.id(data.user1);
        data.user2 = Monk.id(data.user2);
        return await GameCollection.insert(data);
    } catch (error) {
        throw (error);
    }
};
Game.update = async function (gameId, data) {
    console.log(`Updating Game:${gameId} with following data: ${JSON.stringify(data)}`);
    return await GameCollection.update({
        "_id": monk.id(gameId),
    }, {
        $set: data,
    }, );

}

Game.getAll = async function () {
    return await GameCollection.find({});
}

Game.getGameById = async function (gameId) {
    try {
        console.log(`Get Game by Id: ${gameId}`);
        let cond = [];
        cond.push(this._createOrFilter("$eq", {
            "_id": gameId
        }));
        cond.push(this._createUserLookup('user1'));
        cond.push(this._createUserLookup('user2'));
        cond.push({
            $project: {
                "user1.email": 0,
                "user1.hashedPassword": 0,
                "user1.createdOn": 0,
                "user2.email": 0,
                "user2.hashedPassword": 0,
                "user2.createdOn": 0
            }
        });
        console.log(`FilterCondition: ${JSON.stringify(cond)}`);
        let game = await GameCollection.aggregate(cond);
        // the two joins with user1 and user2 create arrays with one object but we want object
        game = _.each(game, function (obj) {
            obj.user1 = _.head(obj.user1);
            obj.user1.name = `${obj.user1.firstName} ${obj.user1.lastName}`;
            obj.user2 = _.head(obj.user2);
            obj.user2.name = `${obj.user2.firstName} ${obj.user2.lastName}`;
        });
        if (_.size(game) === 1) {
            return _.head(game);
        } else {
            throw new Error("no Game found");
        }
    } catch (error) {
        throw (error);
    }
}

Game.getGamesByUser = async function (userId, filter = {}) {
    Joi.assert(userId, Joi.string());
    // check if filter object contains correct properties
    //filter by user1 and user 2
    try {
        if (_.size(filter) >= 1) {
            await gameSchema.validateAsync(filter);
        }
        var cond = [this._createUserFilter(userId, filter)];
        cond.push(this._createUserLookup('user1'));
        cond.push(this._createUserLookup('user2'));
        cond.push({
            $project: {
                "user1.email": 0,
                "user1.hashedPassword": 0,
                "user1.createdOn": 0,
                "user2.email": 0,
                "user2.hashedPassword": 0,
                "user2.createdOn": 0
            }
        });
        console.log(`aggregation steps: ${JSON.stringify(cond)}`);
        let gameData = await GameCollection.aggregate(cond);
        // the two joins with user1 and user2 create arrays with one object but we want object
        console.log(`Got ${_.size(gameData)} Games`);
        gameData = _.each(gameData, function (obj) {
            obj.user1 = _.head(obj.user1);
            obj.user1.name = `${obj.user1.firstName} ${obj.user1.lastName}`;
            obj.user2 = _.head(obj.user2);
            obj.user2.name = `${obj.user2.firstName} ${obj.user2.lastName}`;
        });
        return gameData;
    } catch (error) {
        throw (error);
    }
}

Game.addRound = async function (gameId, round) {
    console.log(`addRound: ${JSON.stringify(round)} for game: ${gameId}`);
    return await GameCollection.update({
        '_id': gameId
    }, {
        $push: {
            rounds: round
        }
    });
}

Game.updateRound = async function (gameId, roundNumber, round) {
    console.log(`Update Round for gameId: ${gameId}, roundNumber: ${roundNumber}, round: ${JSON.stringify(round)}`);
    return await GameCollection.update({
        "_id": monk.id(gameId),
        "rounds.roundNumber": roundNumber,
    }, {
        $set: {
            "rounds.$": round,
        },
    }, );
}

Game._createUserFilter = function (userId, filter) {
    let userFilter = {};
    userFilter["user1"] = userId;
    userFilter["user2"] = userId;
    let config = this._createOrFilter("$eq", userFilter);
    config.$match.$and = [];
    config = this._appendAndFilter(config, "$eq", filter);
    //userFilter.$match.$and = [{"_id":{"$eq":monk.id(userId)}}];
    console.log(`createUserFilter: ${JSON.stringify(config)}`);
    console.log(`type of userfilter: ${typeof config.$match.$or[1].user2.$eq}`);
    return config;
}

Game._createOrFilter = function (filterOption, filter = {}) {
    console.log(`createOrFilter: ${filterOption}, filter: ${JSON.stringify(filter)}`)
    if (_.size(filter) >= 1) {
        let config = {
            $match: {
                $or: [],
            }
        }

        config = this._appendOrFilter(config, filterOption, filter);
        console.log(`CreatedOrFilter: ${JSON.stringify(config)}`);
        return config;
    } else {
        throw new Error("filter should contain one or more propetries")
    }
}

Game._createAndFilter = function (filterOption, filter = {}) {
    console.log(`createAndFilter: ${filterOption}, filter: ${JSON.stringify(filter)}`)
    if (_.size(filter) >= 1) {
        let config = {
            $match: {
                $and: [],
            }
        }

        config = this._appendAndFilter(config, filterOption, filter);
        console.log(`CreatedAndFilter: ${JSON.stringify(config)}`);
        return config;
    } else {
        throw new Error("filter should contain one or more propetries")
    }
}

Game._appendOrFilter = function (config, filterOption, filters) {
    console.log(`Entering appenOrFilter. config: ${JSON.stringify(config)}, filterOption: ${filterOption}, filters: ${JSON.stringify(filters)}`);
    try {
        if (_.isObject(filters) && config.$match && config.$match.$or && _.isArray(config.$match.$or)) {
            _.each(filters, function (filterValue, filterProperty) {
                let filterObject = this._createFilterObject(filterProperty, filterOption, filterValue);
                config.$match.$or.push(filterObject);
            }.bind(this));
            return config;
        } else {
            throw new Error("filters must be an array");
        }
    } catch (error) {
        throw error;
    }
}

Game._appendAndFilter = function (config, filterOption, filters) {
    console.log(`Entering appenAndFilter. config: ${JSON.stringify(config)}, filterOption: ${filterOption}, filters: ${JSON.stringify(filters)}`);
    try {
        if (_.isObject(filters) && config.$match && config.$match.$and && _.isArray(config.$match.$and)) {
            _.each(filters, function (filterValue, filterProperty) {
                let filterObject = this._createFilterObject(filterProperty, filterOption, filterValue);
                config.$match.$and.push(filterObject);
            }.bind(this));
            return config;
        } else {
            throw new Error("filters must be an array");
        }
    } catch (error) {
        throw error;
    }
}

Game._createFilterObject = function (filterProperty, filterOption, filterValue) {
    console.log(`Create Filter Object: Property: ${filterProperty}, Option: ${filterOption}, filterValue: ${filterValue}`)
    let filterObject = {};
    let filter = {};
    filterObject[filterOption] = _.includes(_.lowerCase(filterProperty), "id") || filterProperty === 'user1'||  filterProperty === 'user2' ? Monk.id(filterValue) : filterValue;
    filter[filterProperty] = filterObject;
    console.log(`Created Filter Object: ${JSON.stringify(filter)}`);
    return filter;
}

Game._createUserLookup = function (locaField) {
    return {
        $lookup: {
            from: "User", // other table name
            localField: locaField, // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: locaField // alias for userinfo table
        }
    }
}


module.exports = Game;