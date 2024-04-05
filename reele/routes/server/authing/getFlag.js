// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");

// Adatbázis kapcsolat létrehozása
var conn = mysql.createConnection(setup.database);

// Adatbázis kapcsolat ellenőrzése
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén dob egy hibát
});

// Flag ellenőrző middleware függvény
async function chkflag(req, res, next) {
    var post_id = req.postID, // Kérésből kinyert bejegyzés azonosító
        src = null; // Alapértelmezett Flag útvonal

    // Ha a kérés tartalmazza a szükséges adatokat
    if (req.exist) {
        // SQL lekérdezés a Flagk ellenőrzésére
        const sqlm = "SELECT * FROM flags WHERE post_id = ? AND user_id = ? LIMIT 1";

        // SQL lekérdezés végrehajtása
        const result2 = await new Promise((resolve) => {
            conn.query(sqlm, [post_id, req.user.userid], (err, res) => {
                resolve(res);
            });
        });

        // Ha van eredmény
        if (result2) {
            // Ha találunk Flaget az adott bejegyzéshez
            if (result2.length > 0) {
                src = "../assets/flag.svg"; // Flag ikon útvonala
            } else {
                src = "../assets/unflag.svg"; // Flag nélküli ikon útvonala
            }
        } else {
            src = "../assets/unflag.svg"; // Flag nélküli ikon útvonala
        }
    } else {
        src = "../assets/unflag.svg"; // Flag nélküli ikon útvonala
    }

    // Flag ikon útvonal hozzáadása a kéréshez
    req.flagSRC = src;

    // Következő middleware-re továbbítás
    next();
}

// Flag ellenőrző middleware exportálása
exports.chkflag = chkflag;
