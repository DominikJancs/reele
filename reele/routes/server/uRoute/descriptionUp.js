const mysql = require("mysql2");
const setup = require("../setup");

var conn = mysql.createConnection(setup.database);
conn.connect(function (err) {
    if (err) throw err;
});

/* --Change password-- */

async function upDes(req, res) {
    const userId = req.user.userid;
    const descript = req.body.descript;

    try {
        const sql = "SELECT * FROM users WHERE user_id = ?"
        conn.query(sql, [userId], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                const sql = "UPDATE users SET u_description = ? WHERE user_id = ?";
                conn.query(sql, [descript, userId], (err, result) => {
                    if (err) res.status(501);
                });
            }
        });
        res.status(201).json({ status: 201 });
    }
    catch (error) {
        res.status(501);
    }
};


exports.upDes = upDes;