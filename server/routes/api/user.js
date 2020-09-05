const router = require('express').Router();
//TODO Check why absolute path is not working
const User = require('../../models/user.js');
const warGame = require('../../services/warGame.js');
const JWTMiddleWare = require('../../lib/JWTMiddleWare.js');
const _ = require('lodash');


//get current user data
router.get('/', JWTMiddleWare.authenticateJWT, async (req, res, next) => {
    try {
        console.log(`get user:  ${JSON.stringify(req.user)}`);
        if (req.user && req.user.userId) {
            // var user = await User.getById(req.user.userId);
            //get user and all open games
            var user = await warGame.getUserData(req.user.userId);
            // console.log(`Got User from DB ${JSON.stringify(user)}`);
            return res.json(user);
        }
    } catch (error) {
        next(error);
    }
});


router.get('/all', async (req, res, next) => {
    try {
        console.log("get user");
        var users = await User.getAll();
        console.log(JSON.stringify(users));
        return res.json(users);
    } catch (error) {
        next(error);
    }

});

// get possible pleayers to play with
router.get('/opponents', JWTMiddleWare.authenticateJWT, async (req, res, next) => {
    try {
        console.log('get possible opponents');
        var opponents = await warGame.getOpponents(req.user);
        console.log(`Possible Players: ${JSON.stringify(opponents)}`);
        return res.json(opponents);
    } catch (error) {
        next(error);
    }

});

router.post('/', async (req, res, next) => {
    try {
        console.log("create user")
        var body = req.body;
        console.log(req.body);
        const userData = await User.validate(body);
        console.log("validated:  " + JSON.stringify(userData));
        var insertedUser = await User.create(userData);
        return res.json(insertedUser);
    } catch (error) {
        next(error);
    }
});


module.exports = router;