const router = require('express').Router();
//TODO Check why absolute path is not working
const jwt = require('jsonwebtoken');
const Joi = require('joi');


const loginSchema = Joi.object({
    "userName": Joi.string().required(),
    "password": Joi.string().required()
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

        var body = req.body;
        console.log(JSON.stringify(body));
        const value = await loginSchema.validateAsync(body);
        //TODO check if email exists in db
        //TODO hash pw and check if same as in db
        //create jwt
        //get userID from backend
        let userId = "5f45133d21b9b83acc0fae62";
        const token = jwt.sign({
            username: value.userName,
            userId: userId,
            role: "user"
        }, process.env.JWT_SECRET);

        res.statusCode = 200;
        // return token in body
        body.token = token;
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
        //TODO
    } catch (error) {
        next(error);
    }
});


module.exports = router;