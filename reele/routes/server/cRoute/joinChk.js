const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function joinchk(req, res) {
    var clubName = req.params.club;
    userid = req.user.userid;

    const sql = "SELECT * FROM clubs WHERE club_name = ? LIMIT 1";
    const result = await new Promise((resolve) => {
        conn.query(sql, [clubName], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) {
        const sqlm = "SELECT * FROM joins WHERE user_id = ? AND club_id = ? LIMIT 1";
        var club_id = result[0].club_id;

        const result2 = await new Promise((resolve) => {
            conn.query(sqlm, [userid, club_id], (err, res) => {
                resolve(res)
            });
        });
        if (result2.length > 0) {
            res.status(201).json({ value: "Joined" });
        }
        else {
            res.status(201).json({ value: "Join" });
        }
    }
    else res.status(500).json({ msg: "Something went wrong!" });
}

exports.joinchk = joinchk;