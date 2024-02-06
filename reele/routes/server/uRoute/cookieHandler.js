const setup = require("../setup");
const jwt = require("jsonwebtoken");

async function cookieSet(req, res) {
    const token = jwt.sign(req.body.upcdata,
        setup.tokenset,
        {
            expiresIn: "2h",
        });
    const opt = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    res.cookie("token", token, opt);
    res.status(201).json(req.body.msg);
}

exports.cookieSet = cookieSet;

// req.body.upcdata required to get token body...
// req.body.msg required for transfer message...