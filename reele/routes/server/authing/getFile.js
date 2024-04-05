const mysql = require("mysql2");
const setup = require("../setup");
var clubdata = {};
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function getFile(req, res, next) {
    var postTitle= req.params.post;

    const sql = "SELECT * FROM posts WHERE post_title = ? LIMIT 1";
    const result = await new Promise((resolve) => {
        conn.query(sql, [postTitle], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) {
        var post_file_src = result[0].file_path;
        req.document = post_file_src;
        next();
    }
    else res.status(500).json({ msg: "Something went wrong!" });
}

exports.getFile = getFile;