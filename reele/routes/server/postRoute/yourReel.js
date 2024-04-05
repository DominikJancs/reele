const mysql = require("mysql2");
const setup = require("../setup");
const getPost = require("./getPOST");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function yourreel(req, res) {
    var club = req.params.club,
        posts = [];
        reeles = await getReeles(req);


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
                }
                else return res.status(500).json({ msg: "Something went wrong!" });
            }
        }
    }
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
                }
                else return res.status(500).json({ msg: "Something went wrong!" });
            }
        }
    }
    res.status(201).json(posts);
}

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
        }
        else return "";
    }
}

exports.yourreel = yourreel;