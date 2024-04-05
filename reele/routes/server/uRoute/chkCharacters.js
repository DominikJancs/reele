// Az aszinkron funkció, ami ellenőrzi, hogy a leírás hossza nem haladja-e meg a 255 karaktert
async function charaterChk255(req, res, next) {
    // A leírás hosszának meghatározása a kérésből
    const descriptL = req.body.descript.length;

    // Ha a leírás hossza nem haladja meg a 255 karaktert, átadjuk a vezérlést a következő middleware-nek
    if (descriptL <= 255) {
        next();
    } else {
        // Ha a leírás hossza meghaladja a 255 karaktert, 501-es státuszkóddal válaszolunk
        res.status(501).end();
    }
}

// Az exporthoz rendeljük a charaterChk255 függvényt
exports.charaterChk255 = charaterChk255;
