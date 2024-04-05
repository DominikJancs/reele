const mysql = require("mysql2"); // Importáljuk a MySQL csomagot
const setup = require("../setup"); // Importáljuk a beállításokat

// Létrehozunk egy kapcsolatot az adatbázissal
var conn = mysql.createConnection(setup.database);

// Kapcsolódunk az adatbázishoz
conn.connect(function (err) {
    if (err) throw err;
});

// Az aszinkron funkció, ami frissíti a felhasználó leírását
async function upDes(req, res) {
    // A felhasználó azonosítója és a leírás kinyerése a kérésből
    const userId = req.user.userid;
    const descript = req.body.descript;

    try {
        // Felhasználó lekérése az adatbázisból az azonosító alapján
        const sql = "SELECT * FROM users WHERE user_id = ?";
        conn.query(sql, [userId], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                // Felhasználó leírásának frissítése az adatbázisban
                const sql = "UPDATE users SET u_description = ? WHERE user_id = ?";
                conn.query(sql, [descript, userId], (err, result) => {
                    if (err) res.status(501); // Hiba esetén 501-es státuszkóddal válaszolunk
                });
            }
        });
        res.status(201).json({ status: 201 }); // Sikeres válasz 201-es státuszkóddal
    }
    catch (error) {
        res.status(501); // Hiba esetén 501-es státuszkóddal válaszolunk
    }
}

// Az exporthoz rendeljük az upDes függvényt
exports.upDes = upDes;
