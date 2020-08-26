const Game = require('../models/game.js');
const Round = require('../models/round.js');
var _ = require('lodash');

//var game = require();

WarGame = {};


//create game and first round
WarGame.createGame = async function (gameData, creatingUser) {

  try {

    //write down  current user as initiator of the game
    gameData.user1 = creatingUser;
    console.log("validated:  " + JSON.stringify(gameData));
    var createdGame = await Game.create(gameData);
    console.log(JSON.stringify(createdGame));
    var firstRound = {
      "gameId": createdGame["_id"]
    }
    firstRound = await Round.create(firstRound);

    return createdGame;
  } catch (error) {
    throw (error);
  }
}

WarGame.getGamesByUser = async function (userId) {
  //get all games for this user
  var games = Game.getGamesByUser(userId);
  //get all round for these games

  //determine if games are over or not

  return games;

}



module.exports = WarGame;