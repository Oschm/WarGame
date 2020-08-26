var req, res, next;
const jwt = require('jsonwebtoken');

JWTMiddleWare = {};

JWTMiddleWare.authenticateJWT = (req, res, next) => {
    const jwtToken = req.cookies.token;

    if (jwtToken) {

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