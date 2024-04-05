// Szükséges modulok importálása
const mysql = require("mysql2"); // MySQL modul importálása
const setup = require("../setup"); // Beállítások importálása
var conn = mysql.createConnection(setup.database); // MySQL kapcsolat létrehozása

// MySQL adatbáziskapcsolat létrehozása
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén hibaüzenet dobása
});

// Könyvjelző létrehozása
async function createbookmark(req, res) {
    var postTitle = req.params.post; // Bejegyzés címének lekérése a paraméterekből
    var page = req.body.page, // Oldalszám lekérése a kéréstől
        userid = req.user.userid; // Felhasználó azonosítójának lekérése

    const sql = "SELECT * FROM posts WHERE post_title = ? LIMIT 1"; // SQL lekérdezés előkészítése
    const result = await new Promise((resolve) => { // Várakoztatás
        conn.query(sql, [postTitle], (err, res) => { // SQL lekérdezés végrehajtása
            resolve(res)
        });
    });
    if (result.length > 0) { // Ha eredmény van
        const sqlm = "SELECT * FROM bookmarks WHERE user_id = ? AND post_id = ? AND b_page_pin = ? LIMIT 1"; // SQL lekérdezés előkészítése
        var post_id = result[0].post_id; // Bejegyzés azonosítójának lekérése

        const result2 = await new Promise((resolve) => { // Várakoztatás
            conn.query(sqlm, [userid, post_id, page], (err, res) => { // SQL lekérdezés végrehajtása
                resolve(res)
            });
        });
        if (result2.length > 0) { // Ha már létezik könyvjelző
            const del = 'DELETE FROM bookmarks WHERE user_id = ? AND post_id = ? AND b_page_pin = ?'; // SQL törlési parancs előkészítése
            conn.query(del, [userid, post_id, page], (err, result) => { // SQL törlési parancs végrehajtása
                if (err) throw err; // Hiba esetén hibaüzenet dobása
            });
            res.status(201).json({ class: "bookmark" }); // Státusz küldése
        }
        else { // Ha még nem létezik könyvjelző
            const comm = 'INSERT INTO bookmarks(user_id, post_id, b_page_pin) values(?,?,?)'; // SQL beszúrási parancs előkészítése
            conn.query(comm, [userid, post_id, page], (err, result) => { // SQL beszúrási parancs végrehajtása
                if (err) throw err; // Hiba esetén hibaüzenet dobása
            });
            res.status(201).json({ class: "bookmark marked" }); // Státusz küldése
        }
    }
    else res.status(500).json({ msg: "Something went wrong!" }); // Egyébként hibaüzenet küldése
}

// Exportálás
exports.createbookmark = createbookmark; // Könyvjelző létrehozásának exportálása
