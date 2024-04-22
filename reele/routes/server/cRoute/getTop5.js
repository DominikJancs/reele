const mysql = require("mysql2");
const setup = require("../setup");

var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
  if (err) throw err; 
});

async function gettop5(req, res) {
  const sql =
    "SELECT club_name AS club FROM clubs ORDER BY join_count DESC LIMIT 5"; 
  const result = await new Promise((resolve) => {
    conn.query(sql, (err, res) => {
      resolve(res); 
    });
  });

  if (result) {
    if (result.length > 0) {
      res.status(201).json(result); 
    } else {
      res.status(500).json({ msg: "Something went wrong!" }); 
    }
  } else {
    res.status(500).json({ msg: "Something went wrong!" }); 
  }
}

exports.gettop5 = gettop5;