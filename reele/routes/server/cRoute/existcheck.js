// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");

// Adatbázis kapcsolat létrehozása
var conn = mysql.createConnection(setup.database);

// Adatbázis kapcsolat ellenőrzése
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén dob egy hibát
});

// Létező klub ellenőrzése middleware függvény
async function existchk(req, res, next) {
    const sql = "SELECT * FROM clubs WHERE club_name = ? LIMIT 1"; // SQL lekérdezés a klubnév ellenőrzésére

    // SQL lekérdezés végrehajtása
    const result = await new Promise((resolve) => {
        conn.query(sql, [req.body.clubname], (err, res) => {
            resolve(res); // Lekérdezés eredményének visszaadása
        });
    });

    // Ha találunk eredményt (klub már létezik)
    if (result.length > 0) {
        res.status(404).send("Clubname already taken!").json(); // Hibaüzenet küldése
    } else {
        next(); // Ha nem találunk eredményt, folytatjuk a következő middleware-lel
    }
}

// Middleware függvény exportálása
exports.existchk = existchk;
