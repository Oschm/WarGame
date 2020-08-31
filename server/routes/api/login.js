const router = require('express').Router();
//TODO Check why absolute path is not working
const Joi = require('joi');
const warGame = require('../../services/warGame.js');


const loginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
});

const signUpSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
});


router.get('/', (req, res, next) => {
    console.log("login get test");
    // res.header('Access-Control-Allow-Origin', '*');
    /*res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );*/

    res.status('200');
    res.json({
        success: true
    })

});


// login
router.post('/', async (req, res, next) => {
    try {
        console.log("login")

        let body = req.body;
        console.log(JSON.stringify(body));
        const loginData = await loginSchema.validateAsync(body);
        let userToken = await warGame.loginUser(loginData);
        res.statusCode = 200;
        // return token in body
        body.token = userToken;
        return res.json(req.body);
    } catch (error) {
        console.log(`/login post error: ${error.message}`);
        res.status('400');
        res.send(error.message);
        //next(error);
    }
});

// login
router.post('/signup', async (req, res, next) => {
    try {
        console.log("signup")
        let body = req.body;
        console.log(JSON.stringify(body));
        let signUpData = await signUpSchema.validateAsync(body);
        let token = await warGame.signUp(signUpData);
        res.statusCode = 200;
        // return token in body
        return res.json({token});
    } catch (error) {
        console.log("signup error");
        next(error);
    }
});


module.exports = router;