const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function flaging(req, res) {
    var postTitle = req.params.post;
    userid = req.user.userid;

    const sql = "SELECT * FROM posts WHERE post_title = ? LIMIT 1";
    const result = await new Promise((resolve) => {
        conn.query(sql, [postTitle], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) {
        const sqlm = "SELECT * FROM flags WHERE user_id = ? AND post_id = ? LIMIT 1";
        var post_id = result[0].post_id;
        var club_id = result[0].club_id;

        const result2 = await new Promise((resolve) => {
            conn.query(sqlm, [userid, post_id], (err, res) => {
                resolve(res)
            });
        });
        if (result2.length == 0) {
            const comm = 'INSERT INTO flags(user_id, post_id, club_id) values(?,?,?)';
            conn.query(comm, [userid, post_id, club_id], (err, result) => {
                if (err) throw err;
            });
            handlePostFlag(post_id);
            res.status(201).json({ value: "../assets/flag.svg" });
        }
        else {
            res.status(201).json({ value: "../assets/flag.svg" });
        }
    }
    else res.status(500).json({ msg: "Something went wrong!" });
}

async function handlePostFlag(postID) {
    const sql = "UPDATE posts SET flag_count = flag_count + 1 WHERE post_id = ?";
    conn.query(sql, [postID], (err, result) => {

    });
}

exports.flaging = flaging;