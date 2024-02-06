async function killuser(req, res, next) {
    res.clearCookie("token").json({success: true});
}

exports.killuser = killuser;