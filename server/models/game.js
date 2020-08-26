const url = process.env.MONGO_URL; // Connection URL
const db = require('monk')(url);

db.on('timeout', () => {
    console.log("timeout");
})

var Game = {};
const GameCollection = db.get('Game');

const Joi = require('joi');

//user1 not required because it is set by backend
const gameSchema = Joi.object({
    "user1": Joi.string(),
    "user2": Joi.string().required(),
    "playerHealth": Joi.number().integer().default(3),
    "startedTime": Joi.date().default(function () {
        return new Date();
    }),
    "endTime": Joi.date(),
    "invitationPending": Joi.boolean().default(true)
});

Game.validate = async function (gameObject) {
    return await gameSchema.validateAsync(gameObject);

};

Game.create = async function (data) {
    console.log("create Game in DB");
    return await GameCollection.insert(data);
};

Game.getAll = async function () {
    return await GameCollection.find({});
}

Game.getGamesByUser = async function (userId) {
    Joi.assert(userId, Joi.string());
    return await GameCollection.find({
        "user1.id": userId
    });

}

module.exports = Game;