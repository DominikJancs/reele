const mysql = require("mysql2");
const setup = require("../setup");
var clubdata = {};
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function getClub(req, res, next) {
    var club = req.clubID;

    const sql = "SELECT * FROM clubs WHERE club_id = ? LIMIT 1";
    const result = await new Promise((resolve) => {
        conn.query(sql, [club], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) {
        req.clubP = result[0].club_name;
        next();
    }
    else res.status(500).json({ msg: "Something went wrong!" });
}

exports.getClub = getClub;