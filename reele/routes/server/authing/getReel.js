const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function chkreel(req, res, next) {
    var post_id = req.postID,
        src = null;

    if (req.exist) {
        const sqlm = "SELECT * FROM reeles WHERE post_id = ? AND user_id = ? LIMIT 1";
        const result2 = await new Promise((resolve) => {
            conn.query(sqlm, [post_id, req.user.userid], (err, res) => {
                resolve(res)
            });
        });
        if (result2) {
            if (result2.length > 0) {
                src = "../assets/reele-icon-a.svg";
            }
            else {
                src = "../assets/unreeled.svg";
            }
        }
        else {
            src = "../assets/unreeled.svg";
        }
    }
    else {
        src = "../assets/unreeled.svg";
    }

    req.src = src;
    next();
}

exports.chkreel = chkreel;