const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
    // get token from header
    const token = req.header('x-auth-token');

    // check token exists
    if (!token) {
        return res.status(401).json({ msg: "No token. Denied authorization!" });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // JWT is decoded above and verified. verify returns the payload of the token
        // and the payload contains the user, which is then passed to request and then passed on.
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token!" });
    }
};
