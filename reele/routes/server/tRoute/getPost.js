const mysql = require("mysql2");
const setup = require("../setup");
var clubdata = {};
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function getPost(req, res, next) {
    var postTitle= req.params.post;

    const sql = "SELECT * FROM posts WHERE post_title = ? LIMIT 1";
    const result = await new Promise((resolve) => {
        conn.query(sql, [postTitle], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) {
        var post_id = result[0].post_id;
        req.postID = post_id;
        console.log(post_id)
        next();
    }
    else res.status(500).json({ msg: "Something went wrong!" });
}

exports.getPost = getPost;