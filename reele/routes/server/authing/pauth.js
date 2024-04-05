const jwt = require("jsonwebtoken");
const setup = require("../setup");

async function verifyToken(req, res, next) {
    const token = req.cookies.token;

    try {
        const user = await jwt.verify(token, setup.tokenset);
        var udata = {
          userid: user.userid,
          email: user.email,
          username: user.username,
          icon: user.icon
        };
        req.user = udata;
        req.exist = true;
    }
    catch {
        res.clearCookie("token");
        req.exist = false;
    }
    next();
}

exports.verifyToken = verifyToken;