const Game = require('../models/game.js');
const Round = require('../models/round.js');
var _ = require('lodash');
const User = require('../models/user.js');
var passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

//var game = require();

WarGame = {};


WarGame.loginUser = async function (userData) {
  console.log("loginUser");
  try {
    //TODO check if email exists in db
    let user = await User.getByUserName(userData.userName);
    //TODO hash pw and check if same as in db
    console.log("user from db: " + JSON.stringify(user));
    let hashedPassword = user.hashedPassword;
    if (hashedPassword) {
      let passwordVerified = passwordHash.verify(userData.password, hashedPassword);
      //create jwt
      //get userID from backend
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

WarGame.getUserData = async function (userId) {
  console.log(`Get UserData for User with id: ${userId}`);
  try {
    var userData = await User.getById(userId);
    var gameData = await this.getGamesByUser(userId);
    userData.games = gameData;
    return userData;
  } catch (error) {
    throw (error);
  }
}

WarGame.getGamesByUser = async function (userId) {
  //get all games for this user
  console.log(`Get Games from User with id: ${userId}`);
  try {
    var games = await Game.getGamesByUser(userId);
    //get all round for these games

    //determine if games are over or not

    return games;
  } catch (error) {
    throw (error);
  }
}

WarGame.getOpponents = async function (userData) {
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
}

function createJWT(userData) {
  console.log(`Creating JWT. User ID: ${JSON.stringify(userData)}`);
  return jwt.sign({
    username: userData.userName,
    userId: userData._id,
    role: "user"
  }, process.env.JWT_SECRET);
}

module.exports = WarGame;