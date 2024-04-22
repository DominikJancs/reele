const setup = require("../setup");

const jwt = require("jsonwebtoken");

async function cookieSet(req, res) {

    const token = jwt.sign(
        req.body.upcdata, 
        setup.tokenset, 
        {
            expiresIn: "2h", 
        }
    );

    const opt = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
        httpOnly: true 
    };

    res.cookie(req.admin ? "admin" : "token", token, opt);

    res.status(201).json({ msg: req.body.msg, name: req.admin ? req.body.upcdata.name : null });
}

exports.cookieSet = cookieSet;