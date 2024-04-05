// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");
var clubdata = {};

// Adatbázis kapcsolat létrehozása
var conn = mysql.createConnection(setup.database);

// Adatbázis kapcsolat ellenőrzése
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén dob egy hibát
});

// Klub lekérdező middleware függvény
async function getClub(req, res, next) {
    var club = req.clubID; // Kérésből kinyert klub azonosító

    // SQL lekérdezés klub adatok lekérdezésére
    const sql = "SELECT * FROM clubs WHERE club_id = ? LIMIT 1";

    // SQL lekérdezés végrehajtása
    const result = await new Promise((resolve) => {
        conn.query(sql, [club], (err, res) => {
            resolve(res);
        });
    });

    // Ha vannak eredmények
    if (result.length > 0) {
        req.clubP = result[0].club_name; // Klub nevének hozzáadása a kéréshez
        next(); // Következő middleware-re továbbítás
    } else {
        // Ha nincsenek eredmények, hibakóddal válaszolunk
        res.status(500).json({ msg: "Something went wrong!" });
    }
}

// Klub lekérdező middleware exportálása
exports.getClub = getClub;
