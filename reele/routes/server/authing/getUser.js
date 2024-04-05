// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");

// Adatbázis kapcsolat létrehozása
var conn = mysql.createConnection(setup.database);

// Adatbázis kapcsolat ellenőrzése
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén dob egy hibát
});

// Felhasználó lekérdező middleware függvény
async function getUser(req, res, next) {
    var userName = req.params.user; // Kérésből kinyert felhasználónév

    // SQL lekérdezés felhasználó adatok lekérdezésére a név alapján
    const sql = "SELECT * FROM users WHERE user_name = ? LIMIT 1";

    // SQL lekérdezés végrehajtása
    const result = await new Promise((resolve) => {
        conn.query(sql, [userName], (err, res) => {
            resolve(res);
        });
    });

    // Ha vannak eredmények
    if (result.length > 0) {
        // Felhasználó profilkép útvonalának lekérése az adatbázisból
        var user_profile = result[0].u_icon_path;

        // Felhasználó profilkép útvonal hozzáadása a kéréshez
        req.user = user_profile;

        // Következő middleware-re továbbítás
        next();
    } else {
        // Ha nincsenek eredmények, hibakóddal válaszolunk
        res.status(500).json({ msg: "Something went wrong!" });
    }
}

// Felhasználó lekérdező middleware exportálása
exports.getUser = getUser;
