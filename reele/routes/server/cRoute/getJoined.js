const mysql = require("mysql2"); // MySQL modul importálása
const setup = require("../setup"); // Beállítások modul importálása
var conn = mysql.createConnection(setup.database); // Adatbázis kapcsolat létrehozása

conn.connect(function (err) { // Adatbázis kapcsolat ellenőrzése
    if (err) throw err;
});

async function getjoin(req, res) { // Felhasználó csatlakozásainak lekérdezése
    var userid = req.user.userid; // Felhasználó azonosítójának meghatározása

    const sql = "SELECT club_id FROM joins WHERE user_id= ?"; // SQL lekérdezés az adott felhasználó csatlakozásainak lekérdezéséhez
    const result = await new Promise((resolve) => { // Promise létrehozása az aszinkron lekérdezéshez
        conn.query(sql, [userid], (err, res) => { // Adatbázis lekérdezés végrehajtása
            resolve(res); // Eredmény visszatérése a promisal
        });
    });
    if (result.length > 0) { // Ha vannak eredmények
        let clubData = []; // Klub adatok tömbjének inicializálása
        const sqlm = "SELECT club_name AS club FROM clubs WHERE club_id = ?"; // SQL lekérdezés a klub nevének lekérdezéséhez

        for (let i = 0; i < result.length; i++) { // Eredmények feldolgozása
            const result2 = await new Promise((resolve) => { // Promise létrehozása az aszinkron lekérdezéshez
                conn.query(sqlm, [result[i].club_id], (err, res) => { // Adatbázis lekérdezés végrehajtása
                    resolve(res); // Eredmény visszatérése a promisal
                });
            });
            if (result2.length > 0) { // Ha vannak eredmények
                clubData.push(result2[0]); // Klub adatok tömbjének frissítése
            }
            else res.status(500).json({ msg: "Something went wrong!" }); // Hibaüzenet küldése, ha valami nem stimmel
        }
        res.status(201).json(clubData); // Klub adatok JSON formátumban történő visszatérése
    }
    else res.status(500).json({ msg: "Something went wrong!" }); // Hibaüzenet küldése, ha valami nem stimmel
}

exports.getjoin = getjoin; // Az exportálás meghatározása
