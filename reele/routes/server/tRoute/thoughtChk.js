const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function thoughtchk(req, res, next) {
    const sql = "SELECT * FROM thoughts WHERE thought_id = ? LIMIT 1";
    const result = await new Promise((resolve) => {
        conn.query(sql, [req.body.thought], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) next();
    else res.status(500).json({ msg: "Something went wrong!" });
}

exports.thoughtchk = thoughtchk;