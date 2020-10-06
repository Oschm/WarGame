const Joi = require('joi');


const roundSchema = Joi.object({
    "roundNumber": Joi.number().integer().default(1),
    "user1Attack": Joi.string().default(null),
    "user2Attack": Joi.string().default(null),
    "user1Defend": Joi.string().default(null),
    "user2Defend": Joi.string().default(null),
    "user1Health": Joi.number(),
    "user2Health": Joi.number(),
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
            this.roundNumber = round.roundNumber;
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
            return (!!this.user1Attack || !!this.user1Defend) ? true : false;
        } else if (user === 'user2') {
            return !!this.user2Attack || !!this.user2Attack ? true : false;
        } else {
            throw ('User does not exist')
        }
    }
    playRound(user, attack, defend) {
        console.log(`enter playRound: user: ${user}, attack: ${attack}, defend: ${defend}`);
        if (user === 'user1' && attack && defend) {
            this.user1Attack = attack;
            this.user1Defend = defend;
            this.user1PlayTime = new Date();
        } else if (user === 'user2') {
            this.user2Attack = attack;
            this.user2Defend = defend;
            this.user2PlayTime = new Date();
        } else {
            throw ('User does not exist');
        }
    }

    determineRoundResult() {
        console.log("Enter determineRoundWinner");

        try {
            if (!this.user1Attack || !this.user1Defend || !this.user2Attack || !this.user2Defend) {
                throw new Error("Players haven't finished playing yet");
            }
            if (this.user1Attack !== this.user2Defend) {
                this.user2Health = this.user2Health - 1;
            }
            if (this.user2Attack !== this.user1Defend) {
                this.user1Health = this.user1Health - 1;
            }
        } catch (error) {
            throw (error);
        }
    }

    isRoundOver() {
        console.log(`isRoundOver: ${JSON.stringify(this)}`);
        let result = (!!this.user1Attack && !!this.user2Attack && !!this.user1Defend && !!this.user2Defend) ? true : false;
        console.log(result);
        return result;
    }


}

module.exports = Round;