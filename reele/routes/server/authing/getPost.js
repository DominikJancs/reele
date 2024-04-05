// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");

// Adatbázis kapcsolat létrehozása
var conn = mysql.createConnection(setup.database);

// Adatbázis kapcsolat ellenőrzése
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén dob egy hibát
});

// Borító lekérdező middleware függvény
async function getCover(req, res, next) {
    var postTitle = req.params.post; // Kérésből kinyert bejegyzés címe

    // SQL lekérdezés bejegyzés adatok lekérdezésére a cím alapján
    const sql = "SELECT * FROM posts WHERE post_title = ? LIMIT 1";

    // SQL lekérdezés végrehajtása
    const result = await new Promise((resolve) => {
        conn.query(sql, [postTitle], (err, res) => {
            resolve(res);
        });
    });

    // Ha vannak eredmények
    if (result.length > 0) {
        // Bejegyzés borítókép útvonalának lekérése az adatbázisból
        var post_cover_src = result[0].cover_path;

        // Borítókép útvonal hozzáadása a kéréshez
        req.cover = post_cover_src;

        // Következő middleware-re továbbítás
        next();
    } else {
        // Ha nincsenek eredmények, hibakóddal válaszolunk
        res.status(500).json({ msg: "Something went wrong!" });
    }
}

// Borító lekérdező middleware exportálása
exports.getCover = getCover;
