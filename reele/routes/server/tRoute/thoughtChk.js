const mysql = require("mysql2"); // Importáljuk a MySQL csomagot
const setup = require("../setup"); // Importáljuk a beállításokat
var conn = mysql.createConnection(setup.database); // Létrehozunk egy adatbázis kapcsolatot

// Kapcsolódunk az adatbázishoz
conn.connect(function (err) {
    if (err) throw err;
});

// Az aszinkron funkció, amely ellenőrzi, hogy létezik-e a gondolat
async function thoughtchk(req, res, next) {
    const sql = "SELECT * FROM thoughts WHERE thought_id = ? LIMIT 1"; // SQL lekérdezés a gondolat ellenőrzéséhez
    const result = await new Promise((resolve) => {
        conn.query(sql, [req.body.thought], (err, res) => {
            resolve(res)
        });
    });

    // Ha van eredmény, átadjuk a vezérlést a következő middleware-nek, egyébként hibát küldünk vissza
    if (result.length > 0) {
        next();
    } else {
        res.status(500).json({ msg: "Something went wrong!" });
    }
}

// Az exporthoz rendeljük a thoughtchk függvényt
exports.thoughtchk = thoughtchk;
