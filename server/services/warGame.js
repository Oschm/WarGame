const Game = require('./game.js');
const Round = require('./round.js');
var _ = require('lodash');
const User = require('../models/user.js');
var passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const {
  first,
  round
} = require('lodash');

//var game = require();

WarGame = {};


WarGame.loginUser = async function (userData) {
  console.log("loginUser");
  try {
    // check if email exists in db
    let user = await User.getByUserName(userData.userName);
    // hash pw and check if same as in db
    console.log("user from db: " + JSON.stringify(user));
    let hashedPassword = user.hashedPassword;
    if (hashedPassword) {
      let passwordVerified = passwordHash.verify(userData.password, hashedPassword);
      // create jwt
      // get userID from backend
      if (passwordVerified) {
        return createJWT(user);
      } else {
        throw new Error('Wong Password.');
      }
    } else {
      throw new Error('No Password saved for User.');
    }
  } catch (error) {
    throw (error)
  }
}

WarGame.signUp = async function (userData) {
  // push to db
  console.log("signUp");
  try {
    var hashedPassword = passwordHash.generate(userData.password);
    userData.hashedPassword = hashedPassword;
    userData = _.omit(userData, 'password');
    let user = await User.create(userData);
    return createJWT(user);
  } catch (error) {
    console.log("signUp Error");
    throw Error(error.message);
  }
}

//create game and first round
WarGame.createGame = async function (gameData, creatingUser) {

  try {

    //write down  current user as initiator of the game
    gameData.user1 = creatingUser;
    console.log("validated:  " + JSON.stringify(gameData));
    var createdGame = await new Game(gameData).create();
    console.log(`Created Game: ${JSON.stringify(createdGame)}`);
    let firstRound = new Round({
      user1Health: createdGame.playerHealth,
      user2Health: createdGame.playerHealth
    });
    firstRound = await firstRound.validate();
    console.log(`Validated first Round: ${JSON.stringify(firstRound)}`);
    await createdGame.addRound(firstRound);
    createdGame.rounds = firstRound;
    return createdGame;
  } catch (error) {
    throw (error);
  }
}

WarGame.getUserData = async function (userId) {
  console.log(`Get UserData for User with id: ${userId}`);
  try {
    var userData = await User.getById(userId);
    //add game data of last 5 open games if exist
    var gameData = await Game.getOpenGamesByUser(userId);
    // extend gameData with fields
    userData.games = gameData;
    return userData;
  } catch (error) {
    throw (error);
  }
}




WarGame.getOpponents = async function (userData) {
  try {
    let allUsers = await User.getAll(['_id', 'firstName', 'lastName']);
    console.log(`Users from DB: ${JSON.stringify(allUsers)}`);
    let opponents = _.remove(allUsers, function (user) {
      console.log(typeof user._id.toString());
      console.log(typeof userData.userId);
      console.log(`UserId: ${user._id}, UserId: ${userData.userId}, bool: ${user._id.toString() !== userData.userId}`);
      return user._id.toString() !== userData.userId;
    });
    console.log(`Users from DB: ${JSON.stringify(opponents)}`);
    return opponents;
  } catch (error) {
    throw (error);
  }
}

WarGame.getGames = async function (userId) {
  return await Game.getGamesByUser(userId);
}
WarGame.getGameHistory = async function (userId) {
  let games = await Game.getClosedGamesByUser(userId);
  let gamesWithoutDraws = _.filter(games, function (game) {
    return game.winner !== "Draw";
  });
  console.log(`gameswithoutdraws: ${JSON.stringify(gamesWithoutDraws)}` )
  let wins = _.size(_.filter(gamesWithoutDraws, function (game) {
    return game.winner["_id"].toString() === userId.toString();
  }.bind(this)));
  let losses = _.size(_.filter(gamesWithoutDraws, function (game) {
    return game.winner["_id"].toString() !== userId.toString();
  }.bind(this)));
  let draws = _.size(games) - _.size(gamesWithoutDraws);
  let result = {
    wins,
    losses,
    draws,
    games,
  };
  return result;
}

WarGame.getPersonalizedGameById = async function (userId, gameId) {
  try {
    console.log(`Get Game by Id: ${gameId} for User: ${userId}`);
    //get Game with filter for gameId and UserId.
    let game = await Game.getPersonalizedGameById(userId, gameId);
    return game;
  } catch (error) {
    throw (error);
  }

}

WarGame.playRound = async function (gameId, roundId, userId, roundData) {
  console.log(`Play Round: gameId: ${gameId}, roundId: ${roundId}, userId: ${userId}, roundData: ${JSON.stringify(roundData)}`);
  let game = await Game.getGameById(gameId);
  let rounds = game.rounds;
  console.log(`get rounds ${JSON.stringify(rounds)} for roundId ${roundId}`);
  let round = _.find(rounds, function (round) {
    return round.roundNumber.toString() === roundId.toString();
  }.bind(this));
  if (!round) {
    throw new Error("No Round found");
  }
  console.log(JSON.stringify(round));
  let requiredRound = new Round(round);
  //check if user has already played that round
  let userColumn = _.findKey(game, function (value) {
    if (value && value._id) {
      return value._id.toString() === userId.toString();
    } else
      return false;
  }.bind(this));
  if (!userColumn) {
    throw new Error("User not part of the game");
  }
  if (requiredRound.hasUserPlayed(userColumn)) {
    throw new Error("User already played that round");
  }
  requiredRound.playRound(userColumn, roundData.attack, roundData.defend);
  //if round is over the winner is determined and a new round is created
  if (requiredRound.isRoundOver()) {
    //determine result
    requiredRound.determineRoundResult();
    game.updateRound(requiredRound);
    if (roundId.toString() === game.playerHealth.toString()) {
      //if lastround create result of game
      await game.endGame();
      return {
        success: true
      };
    } else {
      //else create new round
      let newRound = new Round({
        roundNumber: requiredRound.roundNumber + 1,
        user1Health: requiredRound.user1Health,
        user2Health: requiredRound.user2Health,
      });
      let result = await game.addRound(newRound);
      console.log(result);

      return {
        success: true
      };
    }
  } else {
    let result = await game.updateRound(requiredRound);
    if (result.nModified === 1) {
      return 'Round Played';
    } else {
      throw new Error("Error updating Round");
    }
  }
}

function createJWT(userData) {
  console.log(`Creating JWT. User ID: ${JSON.stringify(userData)}`);
  /*let config = {
    expiresIn: '30m'
  }*/
  let config = {};
  return jwt.sign({
    username: userData.userName,
    userId: userData._id,
    role: "user"
  }, process.env.JWT_SECRET, config);
}

module.exports = WarGame;