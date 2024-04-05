// Szükséges modulok importálása
const mysql = require("mysql2"); // MySQL modul importálása
const setup = require("../setup"); // Beállítások importálása
var conn = mysql.createConnection(setup.database); // MySQL kapcsolat létrehozása

// MySQL adatbáziskapcsolat létrehozása
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén hibaüzenet dobása
});

// Reel létrehozása vagy törlése
async function reelecreate(req, res) {
    var postTitle = req.params.post;
    userid = req.user.userid;

    // A bejegyzés lekérése
    const sql = "SELECT * FROM posts WHERE post_title = ? LIMIT 1";
    const result = await new Promise((resolve) => {
        conn.query(sql, [postTitle], (err, res) => {
            resolve(res)
        });
    });
    
    // Ellenőrzés, hogy létezik-e a bejegyzés
    if (result.length > 0) {
        const sqlm = "SELECT * FROM reeles WHERE user_id = ? AND post_id = ? LIMIT 1";
        var post_id = result[0].post_id;

        // Reel létezésének ellenőrzése
        const result2 = await new Promise((resolve) => {
            conn.query(sqlm, [userid, post_id], (err, res) => {
                resolve(res)
            });
        });
        
        // Reel törlése vagy létrehozása
        if (result2.length > 0) {
            const del = 'DELETE FROM reeles WHERE user_id = ? AND post_id = ?';
            conn.query(del, [userid, post_id], (err, result) => {
                if (err) throw err;
            });
            handlePostReel(post_id, -1);
            res.status(201).json({ value: "../assets/unreeled.svg", msg: "Reel it"});
        }
        else {
            const comm = 'INSERT INTO reeles(user_id, post_id) values(?,?)';
            conn.query(comm, [userid, post_id], (err, result) => {
                if (err) throw err;
            });
            handlePostReel(post_id, 1);
            res.status(201).json({ value: "../assets/reele-icon-a.svg", msg: "Reeled"});
        }
    }
    else res.status(500).json({ msg: "Something went wrong!" });
}

// Bejegyzés Reel értékének kezelése
async function handlePostReel(postID, value) {
    const sql = "UPDATE posts SET reele_count = reele_count + ? WHERE post_id = ?";
    conn.query(sql, [value, postID], (err, result) => {

    });
}

// Exportálás
exports.reelecreate = reelecreate; // Reel létrehozásának vagy törlésének exportálása
