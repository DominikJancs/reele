// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");

// Adatbázis kapcsolat létrehozása
var conn = mysql.createConnection(setup.database);

// Adatbázis kapcsolat ellenőrzése
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén dob egy hibát
});

// Műfajok lekérdezése egy adott klubhoz
async function getgenre(req, res) {
    var club_target = req.params.club; // Keresett klub neve
    var genres = []; // Műfajok tömbje

    // SQL lekérdezés a klub azonosítójának lekérésére
    const sql = "SELECT club_id FROM clubs WHERE club_name = ? LIMIT 1";
    const result = await new Promise((resolve) => {
        conn.query(sql, [club_target], (err, res) => {
            resolve(res); // Lekérdezés eredményének visszaadása
        });
    });

    // Ha találunk eredményt (klub létezik)
    if (result.length > 0) {
        const sqlm = "SELECT genre_id FROM genre_log WHERE club_id = ?"; // SQL lekérdezés a klubhoz tartozó műfajok azonosítóinak lekérésére
        var club_id = result[0].club_id; // Klub azonosítója

        // Műfajok azonosítóinak lekérdezése
        const result2 = await new Promise((resolve) => {
            conn.query(sqlm, [club_id], (err, res) => {
                resolve(res); // Lekérdezés eredményének visszaadása
            });
        });

        // Ha találunk eredményt (vannak műfajok a klubhoz)
        if (result2.length > 0) {
            const sqlmm = "SELECT genre FROM genre_lib WHERE genre_id = ?"; // SQL lekérdezés a műfajok nevének lekérésére
            var genre_ids = result2; // Műfajok azonosítói

            // Minden műfajhoz lekérjük a nevét és hozzáadjuk a tömbhöz
            for (let i = 0; i < genre_ids.length; i++) {
                const result3 = await new Promise((resolve) => {
                    conn.query(sqlmm, [genre_ids[i].genre_id], (err, res) => {
                        resolve(res); // Lekérdezés eredményének visszaadása
                    });
                });
                if (result3.length > 0) {
                    genres.push(result3[0].genre); // Műfaj hozzáadása a tömbhöz
                }
                else {
                    res.status(404).send("Something went wrong!").json(); // Hibaüzenet küldése
                    break; // Kilépés a ciklusból
                }
            }
            res.status(201).json(genres); // Műfajok küldése JSON formátumban
        }
        else res.status(404).send("Something went wrong!").json(); // Hibaüzenet küldése
    } 
    else res.status(404).send("Something went wrong!").json(); // Hibaüzenet küldése
}

// Függvény exportálása
exports.getgenre = getgenre;
