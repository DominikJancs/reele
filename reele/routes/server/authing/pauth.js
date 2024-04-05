// JWT és beállítások importálása
const jwt = require("jsonwebtoken");
const setup = require("../setup");

// Token ellenőrző middleware függvény
async function verifyToken(req, res, next) {
    const token = req.cookies.token; // Kérésből kinyert JWT token

    try {
        // JWT token ellenőrzése
        const user = await jwt.verify(token, setup.tokenset);

        // Felhasználó adatainak összeállítása
        var udata = {
            userid: user.userid, // Felhasználó azonosítója
            email: user.email, // Felhasználó e-mail címe
            username: user.username, // Felhasználó felhasználóneve
            icon: user.icon // Felhasználó ikonjának útvonala
        };

        // Felhasználó adatainak hozzáadása a kéréshez
        req.user = udata;

        // Felhasználó létezésének jelzése
        req.exist = true;
    }
    catch {
        // Hiba esetén token süti törlése és felhasználó létezésének jelzése
        res.clearCookie("token");
        req.exist = false;
    }

    // Következő middleware-re továbbítás
    next();
}

// Token ellenőrző middleware exportálása
exports.verifyToken = verifyToken;
