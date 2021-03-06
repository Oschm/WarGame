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
            var games = await warGame.getGames(req.user.userId);
            return res.json(games);
        } else
            throw new Error("Authentication Error");
    } catch (error) {
        next(error);
    }
});

//get all games by User
router.get('/history', JWTMiddleWare.authenticateJWT, async (req, res, next) => {
    try {
        console.log(`get all games for User`);
        if (req.user && req.user.userId && req.user.role) {
            var games = await warGame.getGameHistory(req.user.userId);
            return res.json(games);
        } else
            throw new Error("Authentication Error");
    } catch (error) {
        next(error);
    }
});

router.get('/:gameId', JWTMiddleWare.authenticateJWT, async (req, res, next) =>{
    try {
        console.log(`Get Game: ${req.params.gameId} for user. ${req.user.userId}`);
        if (req.user && req.user.userId && req.user.role) {
            let games = await warGame.getPersonalizedGameById(req.user.userId, req.params.gameId);
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

//play round
//expects following body {attack: 1, defend:2}
router.post('/:gameId/round/:roundId', JWTMiddleWare.authenticateJWT, async (req, res, next) => {
    try {
        console.log("Play Round");
        let gameId = req.params.gameId;
        let roundId = req.params.roundId;
        var userId = req.user.userId;
        let body = req.body;
        if(!body.attack || !body.defend){
            throw new Error('Body needs properties "attack" and "defend"');
        }
        var result = await warGame.playRound(gameId, roundId, userId, body);
        return res.json(result);
    } catch (error) {
        next(error);
    }
});


module.exports = router;