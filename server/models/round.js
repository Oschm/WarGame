const url = process.env.MONGO_URL; // Connection URL
const db = require('monk')(url);

db.on('timeout', () => {
    console.log("timeout");
})

var Round = {};
const RoundCollection = db.get('Round');

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

Round.validate = async function (gameObject) {
    return await RoundCollection.validateAsync(gameObject);

};

Round.create = async function (data) {
    return await RoundCollection.insert(data);
};

Round.getAll = async function () {
    return await RoundCollection.find({});
}
Round.getRoundsByGameId = async function () {

}

module.exports = Round;