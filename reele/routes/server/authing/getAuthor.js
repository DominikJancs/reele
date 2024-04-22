const mysql = require("mysql2");
const setup = require("../setup");

var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err; 
});

async function getAuthor(req, res, next) {
    var author = req.authorID; 

 const sql = "SELECT * FROM users WHERE user_id = ? LIMIT 1";

    const result = await new Promise((resolve) => {
        conn.query(sql, [author], (err, res) => {
            resolve(res); 
        });
    });

    if (result.length > 0) {
        req.authorP = result[0].user_name; 
        next(); 
    } else {

        res.status(500).json({ msg: "Something went wrong!" });
    }
}

exports.getAuthor = getAuthor;