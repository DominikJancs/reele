const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function chkflag(req, res, next) {
    var post_id = req.postID,
        src = null;

    if (req.exist) {
        const sqlm = "SELECT * FROM flags WHERE post_id = ? AND user_id = ? LIMIT 1";
        const result2 = await new Promise((resolve) => {
            conn.query(sqlm, [post_id, req.user.userid], (err, res) => {
                resolve(res)
            });
        });
        if (result2) {
            if (result2.length > 0) {
                src = "../assets/flag.svg";
            }
            else {
                src = "../assets/unflag.svg";
            }
        }
        else {
            src = "../assets/unflag.svg";
        }
    }
    else {
        src = "../assets/unflag.svg";
    }

    req.flagSRC = src;
    next();
}

exports.chkflag = chkflag;