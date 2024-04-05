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

// Fájl lekérdező middleware függvény
async function getFile(req, res, next) {
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
        // Bejegyzés fájl útvonalának lekérése az adatbázisból
        var post_file_src = result[0].file_path;

        // Fájl útvonal hozzáadása a kéréshez
        req.document = post_file_src;

        // Következő middleware-re továbbítás
        next();
    } else {
        // Ha nincsenek eredmények, hibakóddal válaszolunk
        res.status(500).json({ msg: "Something went wrong!" });
    }
}

// Fájl lekérdező middleware exportálása
exports.getFile = getFile;
