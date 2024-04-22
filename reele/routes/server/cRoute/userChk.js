const mysql = require("mysql2"); 
const setup = require("../setup"); 
var conn = mysql.createConnection(setup.database); 

conn.connect(function (err) {
    if (err) throw err; 
});

async function userchk(req, res, next) {
    const sql = "SELECT * FROM users WHERE user_id = ? LIMIT 1"; 
    const result = await new Promise((resolve) => { 
        conn.query(sql, [req.user.userid], (err, res) => { 
            resolve(res)
        });
    });
    if (result.length > 0) next(); 
    else res.status(500).json({ msg: "Something went wrong!" }); 
}

exports.userchk = userchk; 