// Importáljuk a beállításokat
const setup = require("../setup");

// Importáljuk a JWT csomagot
const jwt = require("jsonwebtoken");

// Az aszinkron funkció, ami beállítja a sütit (cookie-t)
async function cookieSet(req, res) {
    // JWT token létrehozása az upcdata alapján
    const token = jwt.sign(
        req.body.upcdata, // Az adat, amelyből a token készül
        setup.tokenset, // A token aláírásához használt titkos kulcs
        {
            expiresIn: "2h", // Token lejárati ideje: 2 óra
        }
    );

    // Cookie beállítások
    const opt = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // A süti lejárati ideje: 30 nap
        httpOnly: true // A süti csak HTTP kérésekben érhető el, nem JavaScriptből
    };

    // Cookie létrehozása és beállítása a válaszban
    res.cookie(req.admin ? "admin" : "token", token, opt);

    // Válasz küldése: státuszkód 201, JSON objektummal, amely tartalmazza az üzenetet és a felhasználó nevét (ha admin)
    res.status(201).json({ msg: req.body.msg, name: req.admin ? req.body.upcdata.name : null });
}

// Az exporthoz rendeljük a cookieSet függvényt
exports.cookieSet = cookieSet;

// req.body.upcdata required to get token body...
// req.body.msg required for transfer message...