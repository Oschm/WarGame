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
        throw new Error('wrong password');
      }
    } else {
      throw new Error('No Password saved for User');
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
    let user =  await User.create(userData);
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

WarGame.getGamesByUser = function (userId) {
  //get all games for this user
  var games = Game.getGamesByUser(userId);
  //get all round for these games

  //determine if games are over or not

  return games;

}

WarGame.getOpponents = async function (userData) {
  let allUsers = await User.getAll(['_id', 'firstName', 'lastName']);
  console.log(`Users from DB: ${JSON.stringify(allUsers)}`);
  let opponents = _.remove(allUsers, function (user) {
    console.log(typeof user._id);
    console.log(typeof userData.userId);
    console.log(`UserId: ${user._id}, UserId: ${userData.userId}, bool: ${user._id !== userData.userId}`);
    return user._id !== userData.userId;
  });
  console.log(`Users from DB: ${JSON.stringify(opponents)}`);
  return opponents;
}

function createJWT (userData) {
  return jwt.sign({
    username: userData.userName,
    userId: userData._id,
    role: "user"
  }, process.env.JWT_SECRET);
}

module.exports = WarGame;