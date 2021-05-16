const jwt = require('jsonwebtoken');
const accessTokenSecret = 'eduardorico';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
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

//AGREGAR 
//const jwt = require('../configJwt.js');
//EJEMPLO
//router.get('/actor', jwt.authenticateJWT, (req, res) => {

module.exports = {
    accessTokenSecret,
    authenticateJWT
};