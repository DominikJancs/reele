// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");

// Adatbázis kapcsolat létrehozása
var conn = mysql.createConnection(setup.database);

// Adatbázis kapcsolat ellenőrzése
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén dob egy hibát
});

// Szerző lekérdező middleware függvény
async function getAuthor(req, res, next) {
    var author = req.authorID; // Kérésből kinyert szerző azonosító

 // SQL lekérdezés szerző adatok lekérdezésére
 const sql = "SELECT * FROM users WHERE user_id = ? LIMIT 1";
 
    // SQL lekérdezés végrehajtása
    const result = await new Promise((resolve) => {
        conn.query(sql, [author], (err, res) => {
            resolve(res); // Lekérdezés eredményének megoldása
        });
    });
    // Ha vannak eredmények
    if (result.length > 0) {
        req.authorP = result[0].user_name; // Szerző nevének hozzáadása a kéréshez
        next(); // Következő middleware-re továbbítás
    } else {
        // Ha nincsenek eredmények, hibakóddal válaszolunk
        res.status(500).json({ msg: "Something went wrong!" });
    }
}

exports.getAuthor = getAuthor;