const mysql = require("mysql2");
const setup = require("../setup");

var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err; 
});

async function existchk(req, res, next) {
    const sql = "SELECT * FROM clubs WHERE club_name = ? LIMIT 1"; 

    const result = await new Promise((resolve) => {
        conn.query(sql, [req.body.clubname], (err, res) => {
            resolve(res); 
        });
    });

    if (result.length > 0) {
        res.status(404).send("Clubname already taken!").json(); 
    } else {
        next(); 
    }
}

exports.existchk = existchk;