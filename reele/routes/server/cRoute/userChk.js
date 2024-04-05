// Szükséges modulok importálása
const mysql = require("mysql2"); // MySQL modul importálása
const setup = require("../setup"); // Beállítások importálása
var conn = mysql.createConnection(setup.database); // MySQL kapcsolat létrehozása

// MySQL adatbáziskapcsolat létrehozása
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén hibaüzenet dobása
});

// Felhasználó ellenőrzése
async function userchk(req, res, next) {
    const sql = "SELECT * FROM users WHERE user_id = ? LIMIT 1"; // SQL lekérdezés előkészítése
    const result = await new Promise((resolve) => { // Várakoztatás
        conn.query(sql, [req.user.userid], (err, res) => { // SQL lekérdezés végrehajtása
            resolve(res)
        });
    });
    if (result.length > 0) next(); // Ha eredmény van, továbblépés a következő middleware-re
    else res.status(500).json({ msg: "Something went wrong!" }); // Egyébként hibaüzenet küldése
}

// Exportálás
exports.userchk = userchk; // Felhasználó ellenőrzésének exportálása
