// JWT modul importálása
const jwt = require("jsonwebtoken");
const setup = require("../setup");

// Hozzáférési adatok lekérdező middleware függvény
async function getAccessPcs(req, res, next) {
    const token = req.cookies.token; // Felhasználó JWT tokenje a süti-ből
    const userParam = req.params.user; // Felhasználónév paraméter a kérésből

    try {
        // Felhasználó ellenőrzése a JWT tokennel
        const user = await jwt.verify(token, setup.tokenset);

        // Ha a paraméterben megadott felhasználónév megegyezik a JWT tokenben található felhasználónévvel
        if (userParam == user.username) {
            // Felhasználó adatainak összeállítása
            var udata = {
                src: user.icon // Felhasználó ikonjának útvonala
            };

            // Felhasználó adatainak hozzáadása a kéréshez
            req.user = udata;

            // Következő middleware-re továbbítás
            next();
        }
    }
    catch {
        // JWT hibája esetén token süti törlése és alapértelmezett ikon beállítása
        res.clearCookie("token");
        var udata = {
            src: 'media/icons/default/default.svg' // Alapértelmezett ikon útvonala
        };

        // Felhasználó adatainak hozzáadása a kéréshez
        req.user = udata;

        // Következő middleware-re továbbítás
        next();
    }
}

// Hozzáférési adatok lekérdező middleware exportálása
exports.getAccessPcs = getAccessPcs;
