const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

// Adatbáziskapcsolat létrehozása
conn.connect(function (err) {
  if (err) throw err; // Kapcsolati hiba esetén kivétel dobása
});

// Jelölt bejegyzések ellenőrzése aszinkron módon
async function checkFlagedPosts(req, res) {
    // Bejegyzés azonosítójának kinyerése a kérésből
  let postID = req.params.postID;  // Jelzők törlése a megadott bejegyzéshez

 // Törlési művelet végrehajtása és válasz küldése
  const del = 'DELETE FROM flags WHERE post_id = ?';
  const result = await new Promise((resolve) => {
    conn.query(del, [postID], (err, result) => {
      resolve(result);
    });
  });
    // Válasz küldése az eredménytől függően
  if (result) res.status(201).json({ msg: "Succesfully checked!" });
  else res.status(201).json({ msg: "This post may already checked!" });
}

exports.checkFlagedPosts = checkFlagedPosts;