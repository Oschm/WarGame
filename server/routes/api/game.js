const router = require('express').Router();
//TODO Check why absolute path is not working
//get models to immmediatly validate oncoming data during create
const Game = require('../../models/game.js');
const warGame = require('../../services/warGame.js');
const _ = require('lodash');
const JWTMiddleWare = require('../../lib/JWTMiddleWare.js');






//get all games by User
router.get('/', JWTMiddleWare.authenticateJWT, async (req, res, next) => {
    try {
        console.log(`get all games for User`);
        if (req.user && req.user.userId && req.user.role) {
            var games = await warGame.getGamesByUser(req.user.userId);
            return res.json(games);
        } else
            throw new Error("Authentication Error");
    } catch (error) {
        next(error);
    }
});

//show all games for admins
router.get('/all'), async (req, res, next) => {
    //check if user has role admin
    res.body = "Not yet implemented";
};

//create new game and first round
//expects following body {game: {user1, user2}}
router.post('/', JWTMiddleWare.authenticateJWT, async (req, res, next) => {
    try {
        console.log("create game")
        var creatingUser = req.user.userId;
        var gameData = await Game.validate(req.body);
        var createdGame = await warGame.createGame(gameData, creatingUser);
        return res.json(createdGame);
    } catch (error) {
        next(error);
    }
});


module.exports = router;