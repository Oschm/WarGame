const Joi = require('joi');


const roundSchema = Joi.object({
    "gameId": Joi.string().required(),
    "user1Attack": Joi.number().integer().default(null),
    "user2Attack": Joi.number().integer().default(null),
    "user1Defend": Joi.number().integer().default(null),
    "user2Defend": Joi.number().integer().default(null),
    "user1Health": Joi.string().default(null),
    "user2Health": Joi.string().default(null),
    "user1PlayTime": Joi.date().default(null),
    "user2PlayTime": Joi.date().default(null),
});
class Round {

    constructor(round) {
        try {
            console.log(`Round Constructor: creating new Round: ${round}`);

        } catch {
            throw (error);
        }
    }

    Round.validate = async function (gameObject) {
        return await RoundCollection.validateAsync(gameObject);

    };

    Round.create = async function (data) {
        return await RoundCollection.insert(data);
    };

    Round.getAll = async function () {
        return await RoundCollection.find({});
    }
    Round.getRoundsByGameId = async function (gameId) {
        try {
            console.log(`Get Rounds for Game with id: ${gameId}`);
            return await RoundCollection.find({
                "gameId": gameId,
            });
        } catch (error) {
            throw (error);
        }

    }
    Round.getRoundsByGame = async function (gameIds) {
        console.log(`Get Rounds for Games: ${JSON.stringify(gameId)}`);
    }

}

module.exports = Round;