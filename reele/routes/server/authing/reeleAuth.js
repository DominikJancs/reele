const mysql = require("mysql2");
const setup = require("../setup");
var reeleData = {};

var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err; 
});

async function reeleAuth(req, res, next) {
    var postTitle = req.params.post; 

    const sql = "SELECT * FROM posts WHERE post_title = ? LIMIT 1";

    const result = await new Promise((resolve) => {
        conn.query(sql, [postTitle], (err, res) => {
            resolve(res);
        });
    });

    if (result) {

        if (result.length > 0) {

            var post_id = result[0].post_id,
                author_id = result[0].author_id,
                club_id = result[0].club_id,
                author = result[0].author_name,
                title = result[0].post_title,
                by = result[0].by_title,
                share = new Date(result[0].create_time).toLocaleString(),
                cover = result[0].cover_path,
                genre_id = result[0].genre_id,
                doc = result[0].file_path,
                reele = result[0].reele_count,
                view = result[0].view_count;

            const sqlm = "SELECT genre FROM genre_lib WHERE genre_id = ? LIMIT 1";
            const result2 = await new Promise((resolve) => {
                conn.query(sqlm, [genre_id], (err, res) => {
                    resolve(res);
                });
            });

            if (result2.length > 0) {

                var reeleData = {
                    author: author,
                    title: title,
                    by: by,
                    share: share,
                    cover: cover,
                    doc: doc,
                    genre: result2[0].genre,
                    reeles: reele,
                    views: view
                };

                req.reele = reeleData;
                req.authorID = author_id;
                req.clubID = club_id;
                req.postID = post_id;

                next();
            } else {

                res.status(500).json({ msg: "Something went wrong!" });
            }
        } else {

            res.status(500).json({ msg: "Something went wrong!" });
        }
    } else {

        res.status(500).json({ msg: "Something went wrong!" });
    }
}

exports.reeleAuth = reeleAuth;