const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function getjoin(req, res) {
    var userid = req.user.userid;

    const sql = "SELECT club_id FROM joins WHERE user_id= ?";
    const result = await new Promise((resolve) => {
        conn.query(sql, [userid], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) {
        let clubData = [];
        const sqlm = "SELECT club_name AS club FROM clubs WHERE club_id = ?";

        for (let i = 0; i < result.length; i++) {
            const result2 = await new Promise((resolve) => {
                conn.query(sqlm, [result[i].club_id], (err, res) => {
                    resolve(res)
                });
            });
            if (result2.length > 0) {
                clubData.push(result2[0]);
            }
            else res.status(500).json({ msg: "Something went wrong!" });
        }
        res.status(201).json(clubData);
    }
    else res.status(500).json({ msg: "Something went wrong!" });
}

exports.getjoin = getjoin;