async function charaterChk255(req, res, next) {
    const descriptL = req.body.descript.length;
    if (descriptL <= 255) next();
    else res.status(501); 
}

exports.charaterChk255 = charaterChk255;