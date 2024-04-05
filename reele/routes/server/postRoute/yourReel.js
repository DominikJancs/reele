// Szükséges modulok importálása
const mysql = require("mysql2"); // MySQL modul importálása
const setup = require("../setup"); // Beállítások importálása
const getPost = require("./getPOST"); // getPOST modul importálása
var conn = mysql.createConnection(setup.database); // MySQL kapcsolat létrehozása

// MySQL adatbáziskapcsolat létrehozása
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén hibaüzenet dobása
});

// Felhasználó Reeljeinek lekérése
async function yourreel(req, res) {
    var club = req.params.club,
        posts = [],
        reeles = await getReeles(req);

    // Ha a klub "home", akkor minden bejegyzés lekérése
    if (club == "home") {
        for (let i = 0; i < reeles.length; i++) {
            const sql = "SELECT post_title AS documentname FROM posts WHERE post_id = ?";
            const result = await new Promise((resolve) => {
                conn.query(sql, [reeles[i].post_id], (err, res) => {
                    resolve(res)
                });
            });
            if (result) {
                if (result.length > 0) {
                    posts.push(result[0]);
                } else {
                    return res.status(500).json({ msg: "Something went wrong!" });
                }
            }
        }
    }
    // Különben csak a megadott klubhoz tartozó bejegyzések lekérése
    else {
        var clubID = await getPost.getClubID(club, res);

        for (let i = 0; i < reeles.length; i++) {
            const sql = "SELECT post_title AS documentname FROM posts WHERE post_id = ? AND club_id = ?";
            const result = await new Promise((resolve) => {
                conn.query(sql, [reeles[i].post_id, clubID], (err, res) => {
                    resolve(res)
                });
            });
            if (result) {
                if (result.length > 0) {
                    posts.push(result[0]);
                } else {
                    return res.status(500).json({ msg: "Something went wrong!" });
                }
            }
        }
    }
    res.status(201).json(posts); // Eredmény visszaküldése JSON formátumban
}

// Reeljeinek lekérdezése a felhasználóhoz tartozó bejegyzésekből
async function getReeles(req) {
    const sql = "SELECT post_id FROM reeles WHERE user_id = ?";
    const result = await new Promise((resolve) => {
        conn.query(sql, [req.user.userid], (err, res) => {
            resolve(res)
        });
    });
    if (result) {
        if (result.length > 0) {
            return result;
        } else {
            return "";
        }
    }
}

// Exportálás
exports.yourreel = yourreel; // Felhasználó Reeljeinek lekérdezése exportálása
