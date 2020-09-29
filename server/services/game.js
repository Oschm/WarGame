const GameModel = require('../models/game.js');
const Round = require('./round');
var _ = require('lodash');
/*
class Game1 {

    private data = {};

    constructor(game, personalized = false, userId) {
        try {
            console.log(`Game Constructor: creating new Game: ${JSON.stringify(game)} /n Personalized Mapping: ${personalized}`);
            this.mapProperties(game, personalized);
            return this;
        } catch (error) {
            throw (error);
        }
    }

    mapProperties(game, personalized, userId) {

    }

    async create() {

    }
}

const inst = new Game1()
*/

function Game(game, personalized = false, userId) {
    try {
        console.log(`Game Constructor: creating new Game: ${JSON.stringify(game)} /n Personalized Mapping: ${personalized}`);
        this.mapProperties(game, personalized);
        return this;
    } catch (error) {
        throw (error);
    }
}
Game.prototype.mapProperties = function (game, personalized, userId) {
    console.log(`Mapping Properties: ${JSON.stringify(game)}`);
    if (game._id) {
        this.id = game._id;
        delete game._id;
    }
    this.playerHealth = game.playerHealth;
    this.startedTime = game.startedTime;
    this.endTime = game.endTime;
    this.invitationPending = game.invitationPending;
    this.gameOver = game.gameOver;
    this.winner = game.winner;
    this.rounds = game.rounds;

    if (!personalized) {
        this.user1 = game.user1;
        this.user2 = game.user2;

    } else {
        let currentUserColumn = (game.user2._id.toString() === userId) ? 'user2' : 'user1';
        let opponentUserColumn = (game.user2._id.toString() === userId) ? 'user1' : 'user2';
        this.opponent = game[opponentUserColumn];
        delete game.user1;
        delete game.user2;
        // check currentRound
        let currentRoundNumber = _.size(game.rounds);
        if (currentRoundNumber >= 1) {
            this.currentRound = currentRoundNumber;
        }
        currentRound = new Round(game.rounds[currentRoundNumber - 1])
        // isUsersTurn set get current Round and check if user has already played
        this.isUsersTurn = currentRound.hasUserPlayed(currentUserColumn);
    }
    console.log(`Mapped Properties: ${JSON.stringify(this)}`);
}
Game.prototype.create = async function () {
    try {
        let game = await GameModel.create(this);
        console.log(`Game created: ${JSON.stringify(game)}`);
        this.mapProperties(game);
        return this;
    } catch (error) {
        throw (error)
    }
}
Game.prototype.addRound = async function (round) {
    GameModel.addRound(this.id, round);
}

Game.getOpenGamesByUser = async function (userId) {
    //get all games for this user
    console.log(`Get Open Games from User with id: ${userId}`);
    try {
        let games = await this.getGamesByUser(userId, {
            gameOver: false
        });
        games = _.map(games, function (game) {
            return new Game(game, true, userId);
        });

        return games;
    } catch (error) {
        throw (error);
    }
}


Game.getGamesByUser = async function (userId, filter = {}) {
    //get all games for this user
    console.log(`Get Games from User with id: ${userId}`);
    try {
        this.userId = userId;
        let games = await GameModel.getGamesByUser(userId, filter);
        //extend games with properties if isUsersTurn, CurrentRound and make sure opponent field is correctly populated with user that is not the user requesting the data
        /*_.each(games, function (game) {
            let isUsersTurn;
            let currentRound;
            let currentUserColumn = (game.user2._id.toString() === userId) ? 'user2' : 'user1';
            let opponentUserColumn = (game.user2._id.toString() === userId) ? 'user1' : 'user2';
            game.opponent = game[opponentUserColumn];
            game.id = game._id;
            delete game._id;
            delete game.user1;
            delete game.user2;
            // check currentRound
            currentRoundNumber = _.size(game.rounds);
            if (currentRoundNumber >= 1) {
                game.currentRound = currentRoundNumber;
            }
            currentRound = new Round(game.rounds[currentRoundNumber - 1])
            // isUsersTurn set get current Round and check if user has already played
            game.isUsersTurn = currentRound.hasUserPlayed(currentUserColumn);
        }.bind(this)); */
        return games;
    } catch (error) {
        throw (error);
    }

}

Game.getClosedGamesByUser = async function (userId) {
    //get all games for this user
    console.log(`Get Closed Games from User with id: ${userId}`);
    try {
        return await this.getGamesByUser(userId, true);
        //get all rounds for these games
    } catch (error) {
        throw (error);
    }
}

Game.getPersonalizedGameById = async function (userId, gameId) {
    try {
        console.log(`Enter getPersonalizedGameById : ${gameId}, for User ${userId}`);
        let game = await GameModel.getGameById(gameId);
        console.log(`Got Game ${JSON.stringify(game)}`);
        if(game.user1._id.toString() !== userId && game.user2._id.toString() !== userId){
            throw new Error("User not part of this Game!");
        }
        return new Game(game, true, userId);
    } catch (error) {
        throw (error);
    }

}

module.exports = Game;