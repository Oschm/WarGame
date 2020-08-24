const router = require('express').Router();
const url = process.env.MONGO_URL; // Connection URL
const db = require('monk')(url);
const _ = require('lodash');
const joi = require('joi');
const Joi = require('joi');
const User = db.get('User');


const userSchema = Joi.object({
    firstName: Joi.string().required(),

    lastName: Joi.string().required(),

    email: Joi.string().email().required(),

    createdOn: Joi.date().default(function () {
        return new Date();
    })
});

router.get('/', async (req, res, next) => {
    try {
        console.log("get user");
        var users = await User.find({});
        console.log(JSON.stringify(users));
        return res.json(users);
        return res.json({success: true});
    } catch (error) {
        next(error);
    }

});

router.post('/', async (req, res, next) => {
    try {
        console.log("create user")
        var body = req.body;
        const value = await userSchema.validateAsync(body);
        console.log("validated:  "+ JSON.stringify(value));
        var insertedUser = await User.insert(value);
        return res.json(insertedUser);
    } catch (error) {
        next(error);
    }
});


module.exports = router;