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
    size
} = require('lodash');

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

Game.getAll = async function () {
    return await GameCollection.find({});
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
        let userData = await GameCollection.aggregate(cond);
        // the two joins with user1 and user2 create arrays with one object but we want object
        userData = _.each(userData, function (obj) {
            obj.user1 = _.head(obj.user1);
            obj.user1.name = `${obj.user1.firstName} ${obj.user1.lastName}`;
            obj.user2 = _.head(obj.user2);
            obj.user2.name = `${obj.user2.firstName} ${obj.user2.lastName}`;
        });
        return userData;
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

Game._createUserFilter = function (userId, filter) {
    let config = {
        $match: {
            $or: [{
                user1: {
                    $eq: Monk.id(userId)
                }
            }, {
                user2: {
                    $eq: Monk.id(userId)
                }
            }],
        }
    }
    if (_.size(filter) > 1) {
        config.$match.$and = [];
        _.each(filter, function (filterValue, filterProperty) {
            let filterObject = {};
            filterObject[filterProperty] = {
                $eq: filterValue
            };
            config.$match.$and.push(filterObject);
        }.bind(this))
    }



    return config;
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