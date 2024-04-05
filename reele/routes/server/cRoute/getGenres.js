const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function getgenre(req, res) {
    var club_target = req.params.club;
        genres = [];

    const sql = "SELECT club_id FROM clubs WHERE club_name = ? LIMIT 1";
    const result = await new Promise((resolve) => {
        conn.query(sql, [club_target], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) {
        const sqlm = "SELECT genre_id FROM genre_log WHERE club_id = ?";
        var club_id = result[0].club_id;
        const result2 = await new Promise((resolve) => {
            conn.query(sqlm, [club_id], (err, res) => {
                resolve(res)
            });
        });
        if (result2.length > 0) {
            const sqlmm = "SELECT genre FROM genre_lib WHERE genre_id = ?";
            var genre_ids = result2;
            for (let i = 0; i < genre_ids.length; i++) {
                const result3 = await new Promise((resolve) => {
                    conn.query(sqlmm, [genre_ids[i].genre_id], (err, res) => {
                        resolve(res)
                    });
                });
                if (result3.length > 0) {
                    genres.push(result3[0].genre);
                }
                else {
                    res.status(404).send("Something went wrong!").json();
                    break;
                }
            }
            res.status(201).json(genres);
        }
        else res.status(404).send("Something went wrong!").json();

    } 
    else res.status(404).send("Something went wrong!").json();
}

exports.getgenre = getgenre;