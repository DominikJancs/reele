// Szükséges modulok importálása
const mysql = require("mysql2"); // MySQL modul importálása
const setup = require("../setup"); // Beállítások importálása
var conn = mysql.createConnection(setup.database); // MySQL kapcsolat létrehozása

// MySQL adatbáziskapcsolat létrehozása
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén hibaüzenet dobása
});

// Nézetek létrehozása
async function viewcreate(req, res, next) {
    var postTitle = req.params.post;

    if (req.exist) {
        var userid = req.user.userid;
        // Bejegyzés lekérése
        const sql = "SELECT * FROM posts WHERE post_title = ? LIMIT 1";
        const result = await new Promise((resolve) => {
            conn.query(sql, [postTitle], (err, res) => {
                resolve(res)
            });
        });
        // Ellenőrzés, hogy létezik-e a bejegyzés
        if (result.length > 0) {
            const sqlm = "SELECT * FROM views WHERE user_id = ? AND post_id = ? LIMIT 1";
            var post_id = result[0].post_id;

            // Nézet létezésének ellenőrzése
            const result2 = await new Promise((resolve) => {
                conn.query(sqlm, [userid, post_id], (err, res) => {
                    resolve(res)
                });
            });
            // Nézet létrehozása vagy létező nézet esetén folytatás
            if (result2.length == 0) {
                const comm = 'INSERT INTO views(user_id, post_id) values(?,?)';
                conn.query(comm, [userid, post_id], (err, result) => {
                    if (err) throw err;
                });
                handlePostReel(post_id, 1); // Bejegyzés nézet számának növelése
                next();
            }
            else next();
        }
    }
    else next();
}

// Bejegyzés nézet számának kezelése
async function handlePostReel(postID, value) {
    const sql = "UPDATE posts SET view_count = view_count + ? WHERE post_id = ?";
    conn.query(sql, [value, postID], (err, result) => {

    });
}

// Exportálás
exports.viewcreate = viewcreate; // Nézet létrehozásának exportálása
