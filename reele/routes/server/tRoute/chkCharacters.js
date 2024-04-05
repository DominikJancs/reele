// Karakterhossz ellenőrzése (maximum 255)
async function charaterChk255(req, res, next) {
    const descriptL = req.body.descript.length; // Leírás hosszának meghatározása
    if (descriptL <= 255) next(); // Ha a hossz nem haladja meg a 255-öt, folytathatjuk
    else res.status(501); // Egyébként 501-es státuszkóddal válaszolunk
}

// Exportálás
exports.charaterChk255 = charaterChk255; // Karakterhossz ellenőrzésének exportálása
