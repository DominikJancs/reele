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

        next();
    }
    catch {
        res.clearCookie("token");
        return res.redirect("/u/");
    }
}

exports.verifyToken = verifyToken;