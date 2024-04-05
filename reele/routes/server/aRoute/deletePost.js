const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

// Adatbáziskapcsolat létrehozása
conn.connect(function (err) {
  if (err) throw err; // Kapcsolati hiba esetén kivétel dobása
});

// Jelölt bejegyzések törlése aszinkron módon
async function deleteFlagedPosts(req, res) {
  let postID = req.params.postID;
  // Bejegyzés azonosítójának kinyerése a kérésből
  const del = 'DELETE FROM posts WHERE post_id = ?';
  // Törlési művelet végrehajtása és válasz küldése
  const result = await new Promise((resolve) => {
    conn.query(del, [postID], (err, result) => {
      resolve(result);
    });
  });
   // Válasz küldése az eredménytől függően
  if (result) res.status(201).json({ msg: "Succesfully deleted!" });
  else res.status(201).json({ msg: "Something went wrong!" });
}

// Függvény exportálása
exports.deleteFlagedPosts = deleteFlagedPosts;