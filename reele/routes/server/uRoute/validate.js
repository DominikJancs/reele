const validator = require("email-validator");
const passvalid = require("./passvalidation");

async function validation(req, res, next) {
    let checkany = null;
    var formType = req.body.form;

    if (formType === "login") {
        checkany = await checkLog(req);
    }
    else if (formType === "signup") {
        checkany = await checkSign(req);
    }
    else {
        return res.status(400).send("Something went wrong!");
    }

    if (checkany) next();
}

async function checkLog(data) {
    let checkData = true;
    if (!(data.body.email && data.body.password && validator.validate(data.body.email) && await passvalid.password(data.body.password)) && data.body.password.length < 6 || data.body.password.length > 30) checkData = false;
    return checkData;
}

async function checkSign(data) {
    let checkData = true;
    if (!(data.body.username && data.body.email && data.body.password && data.body.confirmPassword && validator.validate(data.body.email) && await passvalid.password(data.body.password)) && data.body.password !== data.body.confirmPassword && data.body.password.length < 6 || data.body.password.length > 30) checkData = false;
    return checkData;
}

exports.validation = validation;