const jwt = require("jsonwebtoken");
const setup = require("../setup");

async function getAccessPcs(req, res, next) {
    const token = req.cookies.token; 
    const userParam = req.params.user; 

    try {

        const user = await jwt.verify(token, setup.tokenset);

        if (userParam == user.username) {

            var udata = {
                src: user.icon 
            };

            req.user = udata;

            next();
        }
    }
    catch {

        res.clearCookie("token");
        var udata = {
            src: 'media/icons/default/default.svg' 
        };

        req.user = udata;

        next();
    }
}

exports.getAccessPcs = getAccessPcs;