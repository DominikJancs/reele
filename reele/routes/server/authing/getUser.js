const mysql = require("mysql2");
const setup = require("../setup");

var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err; 
});

async function getUser(req, res, next) {
    var userName = req.params.user; 

    const sql = "SELECT * FROM users WHERE user_name = ? LIMIT 1";

    const result = await new Promise((resolve) => {
        conn.query(sql, [userName], (err, res) => {
            resolve(res);
        });
    });

    if (result.length > 0) {

        var user_profile = result[0].u_icon_path;

        req.user = user_profile;

        next();
    } else {

        res.status(500).json({ msg: "Something went wrong!" });
    }
}

exports.getUser = getUser;