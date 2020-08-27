var req, res, next;
const jwt = require('jsonwebtoken');

JWTMiddleWare = {};

JWTMiddleWare.authenticateJWT = (req, res, next) => {
    console.log("Authenticate JWT");

    if (req.headers.authorization) {
        var jwtToken = req.headers.authorization.split(' ')[1];
        console.log(`Token: ${jwtToken}`);
        jwt.verify(jwtToken, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = exports = JWTMiddleWare;