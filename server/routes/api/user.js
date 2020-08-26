const router = require('express').Router();
//TODO Check why absolute path is not working
const User = require('../../models/user.js');
const warGame = require('../../services/warGame.js');
const _ = require('lodash');



router.get('/', async (req, res, next) => {
    try {
        console.log("get user");
        var users = await User.getAll();
        console.log(JSON.stringify(users));
        return res.json(users);
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