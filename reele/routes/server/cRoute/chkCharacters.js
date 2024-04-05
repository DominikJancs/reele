// Maximum 255 karakter hosszúság ellenőrző middleware függvény
async function charaterChk255(req, res, next) {
    const descriptL = req.body.clubdesc.length; // A klub leírásának hossza

    // Ha a leírás hossza 255 karakteren belül van
    if (descriptL <= 255) {
        req.des = true; // Leírás elfogadva
        next(); // Következő middleware-re továbbítás
    } else {
        req.des = false; // Leírás túl hosszú
        next(); // Következő middleware-re továbbítás
    }
}

// Minimum 3 és maximum 6 karakter hosszúságú librák ellenőrző middleware függvény
async function LcharaterChk3to6(req, res, next) {
    const libras = req.body.libras; // Librák tömbje a kérésből
    var libraChk = false; // Librák ellenőrzésének eredménye (alapértelmezett: hamis)

    // Ha a librák száma kevesebb, mint 2 vagy több, mint 6
    if (libras.length < 2 || libras.length > 6) libraChk = true;

    // Minden libra ellenőrzése
    libras.forEach(libra => {
        if (libra.length > 25) libraChk = true; // Ha egy libra több, mint 25 karakter
    });

    // Ha van probléma a librák valamelyikével
    if (libraChk) {
        res.status(500).json({ msg: "Something went wrong!" }); // Hibaüzenet küldése
    } else {
        next(); // Következő middleware-re továbbítás
    }
}

// Middleware függvények exportálása
exports.charaterChk255 = charaterChk255;
exports.LcharaterChk3to6 = LcharaterChk3to6;
