const Joi = require('joi');


const roundSchema = Joi.object({
    "roundNumber": Joi.number().integer().default(1),
    "user1Attack": Joi.number().integer().default(null),
    "user2Attack": Joi.number().integer().default(null),
    "user1Defend": Joi.number().integer().default(null),
    "user2Defend": Joi.number().integer().default(null),
    "user1Health": Joi.number().default(null),
    "user2Health": Joi.number().default(null),
    "user1PlayTime": Joi.date().default(null),
    "user2PlayTime": Joi.date().default(null),
});
class Round {

    constructor(round) {
        try {
            console.log(`Round Constructor: creating new Round: ${JSON.stringify(round)}`);
            this.user1Attack = round.user1Attack;
            this.user2Attack = round.user2Attack;
            this.user1Defend = round.user1Defend;
            this.user2Defend = round.user2Defend;
            this.user1Health = round.user1Health;
            this.user2Health = round.user2Health;
            this.user1PlayTime = round.user1PlayTime;
            this.user2PlayTime = round.user2PlayTime;
        } catch {
            throw (error);
        }
    }

    async validate() {
        try {
            console.log("validating Round")
            return await roundSchema.validateAsync(this);
        } catch (error) {
            throw (error);
        }
    }
    hasUserPlayed(user) {
        console.log(`hasUserPlayed user: ${user}`)
        if (user === 'user1') {
            console.log(!!this.user1Attack);
            return (!!this.user1Attack && !!this.user1Defend) ? false : true;
        } else if (user === 'user2') {
            return !!this.user2Attack && !!this.user2Attack ? false : true;
        } else {
            throw ('User does not exist')
        }
    }

    get isRoundOver() {
        console.log("isRoundOver");
        return (this.user1Attack && this.user3Attack && this.user1Defend && this.user2Defend) ? true : false;
    }

}

module.exports = Round;