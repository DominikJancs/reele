// Szükséges modulok importálása
const mysql = require("mysql2"); // MySQL modul importálása
const setup = require("../setup"); // Beállítások importálása
var conn = mysql.createConnection(setup.database); // MySQL kapcsolat létrehozása

// MySQL adatbáziskapcsolat létrehozása
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén hibaüzenet dobása
});

// Bejegyzés jelentése
async function flaging(req, res) {
    var postTitle = req.params.post; // Bejegyzés címének lekérése a paraméterekből
    userid = req.user.userid; // Felhasználó azonosítójának lekérése

    const sql = "SELECT * FROM posts WHERE post_title = ? LIMIT 1"; // SQL lekérdezés előkészítése
    const result = await new Promise((resolve) => { // Várakoztatás
        conn.query(sql, [postTitle], (err, res) => { // SQL lekérdezés végrehajtása
            resolve(res)
        });
    });
    if (result.length > 0) { // Ha eredmény van
        const sqlm = "SELECT * FROM flags WHERE user_id = ? AND post_id = ? LIMIT 1"; // SQL lekérdezés előkészítése
        var post_id = result[0].post_id; // Bejegyzés azonosítójának lekérése
        var club_id = result[0].club_id; // Klub azonosítójának lekérése

        const result2 = await new Promise((resolve) => { // Várakoztatás
            conn.query(sqlm, [userid, post_id], (err, res) => { // SQL lekérdezés végrehajtása
                resolve(res)
            });
        });
        if (result2.length == 0) { // Ha még nem lett jelentve a bejegyzés
            const comm = 'INSERT INTO flags(user_id, post_id, club_id) values(?,?,?)'; // SQL beszúrási parancs előkészítése
            conn.query(comm, [userid, post_id, club_id], (err, result) => { // SQL beszúrási parancs végrehajtása
                if (err) throw err; // Hiba esetén hibaüzenet dobása
            });
            handlePostFlag(post_id); // Bejegyzés kezelése a jelentés után
            res.status(201).json({ value: "../assets/flag.svg" }); // Státusz küldése
        }
        else { // Ha már lett korábban jelentve a bejegyzés
            res.status(201).json({ value: "../assets/flag.svg" }); // Státusz küldése
        }
    }
    else res.status(500).json({ msg: "Something went wrong!" }); // Egyébként hibaüzenet küldése
}

// Bejegyzés jelentése utáni kezelés
async function handlePostFlag(postID) {
    const sql = "UPDATE posts SET flag_count = flag_count + 1 WHERE post_id = ?"; // SQL frissítési parancs előkészítése
    conn.query(sql, [postID], (err, result) => { // SQL frissítési parancs végrehajtása

    });
}

// Exportálás
exports.flaging = flaging; // Bejegyzés jelentésének exportálása
