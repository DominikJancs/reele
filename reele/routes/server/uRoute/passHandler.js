const mysql = require("mysql2"); // Importáljuk a MySQL csomagot
const setup = require("../setup"); // Importáljuk a beállításokat
const bcrypt = require('bcrypt'); // Importáljuk a bcrypt csomagot a jelszavak kezeléséhez
const salt = 10;

// Létrehozunk egy kapcsolatot az adatbázissal
var conn = mysql.createConnection(setup.database);

// Kapcsolódunk az adatbázishoz
conn.connect(function (err) {
    if (err) throw err;
});

// Az aszinkron funkció, ami a jelszóváltoztatást kezeli
async function pCH(req, res) {
    const userId = req.user.userid; // Felhasználó azonosítójának kinyerése a kérésből
    const currPass = req.body.current, // Jelenlegi jelszó kinyerése a kérésből
        chPass = req.body.change; // Új jelszó kinyerése a kérésből

    try {
        const sql = "SELECT * FROM users WHERE user_id = ?";

        console.log(currPass + " to change: " + chPass);
        conn.query(sql, [userId], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                // Jelenlegi jelszó ellenőrzése a tárolt jelszóval
                bcrypt.compare(currPass.toString(), result[0].password, (err, response) => {
                    if (err) res.status(501);
                    if (response) {
                        // Új jelszó titkosítása
                        bcrypt.hash(chPass.toString(), salt, function (err, hash) {
                            if (err) res.status(501);
                            const sql = "UPDATE users SET password = ? WHERE user_id = ?";
                            conn.query(sql, [hash, userId], (err, result) => {
                                if (err) res.status(501);
                            });
                        });
                    }
                });
                res.status(201).json({status: 201}); // Sikeres válasz 201-es státuszkóddal
            }
        });
    }
    catch (error) {
        res.status(501); // Hiba esetén 501-es státuszkóddal válaszolunk
    }
}

// Az exporthoz rendeljük a pCH függvényt
exports.pCH = pCH;
