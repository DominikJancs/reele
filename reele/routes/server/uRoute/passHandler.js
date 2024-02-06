const mysql = require("mysql2");
const setup = require("../setup");
const bcrypt = require('bcrypt');
const salt = 10;

var conn = mysql.createConnection(setup.database);
conn.connect(function (err) {
    if (err) throw err;
});

/* --Change password-- */

async function pCH(req, res) {
    const userId = req.user.userid;
    const currPass = req.body.current,
        chPass = req.body.change;

    try {
        const sql = "SELECT * FROM users WHERE user_id = ?";

        console.log(currPass + " to change: " + chPass);
        conn.query(sql, [userId], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                bcrypt.compare(currPass.toString(), result[0].password, (err, response) => {
                    if (err) res.status(501);
                    if (response) {
                        bcrypt.hash(chPass.toString(), salt, function (err, hash) {
                            if (err) res.status(501);
                            const sql = "UPDATE users SET password = ? WHERE user_id = ?";
                            conn.query(sql, [hash, userId], (err, result) => {
                                if (err) res.status(501);
                            });
                            res.status(201);
                        });
                    }
                });
            }
        });
    }
    catch (error) {
        res.status(501);
    }
}


exports.pCH = pCH;