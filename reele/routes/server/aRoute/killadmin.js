async function killa(req, res, next) {
    res.clearCookie("admin").json({success: true});
}

exports.killa = killa;