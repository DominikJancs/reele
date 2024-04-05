// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");

// Adatbázis kapcsolat létrehozása
var conn = mysql.createConnection(setup.database);

// Adatbázis kapcsolat ellenőrzése
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén dob egy hibát
});

// Reel ellenőrző middleware függvény
async function chkreel(req, res, next) {
    var post_id = req.postID, // Kérésből kinyert bejegyzés azonosító
        src = null; // Alapértelmezett ikon útvonal

    // Ha a kérés tartalmazza a szükséges adatokat
    if (req.exist) {
        // SQL lekérdezés a reelek ellenőrzésére
        const sqlm = "SELECT * FROM reeles WHERE post_id = ? AND user_id = ? LIMIT 1";

        // SQL lekérdezés végrehajtása
        const result2 = await new Promise((resolve) => {
            conn.query(sqlm, [post_id, req.user.userid], (err, res) => {
                resolve(res);
            });
        });

        // Ha van eredmény
        if (result2) {
            // Ha találunk reelt az adott bejegyzéshez
            if (result2.length > 0) {
                src = "../assets/reele-icon-a.svg"; // Reel ikon útvonala
            } else {
                src = "../assets/unreeled.svg"; // Reel nélküli ikon útvonala
            }
        } else {
            src = "../assets/unreeled.svg"; // Reel nélküli ikon útvonala
        }
    } else {
        src = "../assets/unreeled.svg"; // Reel nélküli ikon útvonala
    }

    // Reel ikon útvonal hozzáadása a kéréshez
    req.src = src;

    // Következő middleware-re továbbítás
    next();
}

// Reel ellenőrző middleware exportálása
exports.chkreel = chkreel;
