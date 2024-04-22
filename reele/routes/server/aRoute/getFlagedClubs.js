const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
  if (err) throw err;
});

async function getFlagedClubs(req, res) {

  const sql = "SELECT club_id, COUNT(*) AS flags FROM flags GROUP BY club_id";

  const result = await new Promise((resolve) => {
    conn.query(sql, (err, res) => {
      resolve(res);
    });
  });

  if (result.length > 0) {

    var clubs = await getFlagedClubD(result);
    res.status(201).json(clubs); 
  } else res.status(500).json({ msg: "Something went wrong!" }); 
}

async function getFlagedClubD(result) {
  let clubData = [];

  const sqlm = "SELECT club_id AS clubID, club_name AS club FROM clubs WHERE club_id = ?";

  for (let i = 0; i < result.length; i++) {
    const result2 = await new Promise((resolve) => {
      conn.query(sqlm, [result[i].club_id], (err, res) => {
        resolve(res);
      });
    });

    if (result2.length > 0) {
      result2[0].flags = result[i].flags;
      clubData.push(result2[0]);
    }
  }
  return clubData; 
}

exports.getFlagedClubs = getFlagedClubs;