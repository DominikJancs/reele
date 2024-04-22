async function charaterChk255(req, res, next) {
    const descriptL = req.body.clubdesc.length; 

    if (descriptL <= 255) {
        req.des = true; 
        next(); 
    } else {
        req.des = false; 
        next(); 
    }
}

async function LcharaterChk3to6(req, res, next) {
    const libras = req.body.libras; 
    var libraChk = false; 

    if (libras.length < 2 || libras.length > 6) libraChk = true;

    libras.forEach(libra => {
        if (libra.length > 25) libraChk = true; 
    });

    if (libraChk) {
        res.status(500).json({ msg: "Something went wrong!" }); 
    } else {
        next(); 
    }
}

exports.charaterChk255 = charaterChk255;
exports.LcharaterChk3to6 = LcharaterChk3to6;