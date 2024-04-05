const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
  if (err) throw err;
});

// Jelzett bejegyzések lekérdezése aszinkron módon
async function getFlagedPosts(req, res) {
  // Klub azonosító kinyerése a kérésből
  let clubID = req.params.clubID;

    // SQL lekérdezés a jelzett bejegyzések lekérdezésére és összesítésére klubonként
  const sql = "SELECT post_id, COUNT(*) AS flags FROM flags WHERE club_id = ? GROUP BY post_id";
    // Lekérdezés végrehajtása és eredmények megvárása
  const result = await new Promise((resolve) => {
    conn.query(sql, [clubID], (err, res) => {
      resolve(res);
    });
  });
      // Ha vannak eredmények
  if (result.length > 0) {
        // Bejegyzések részletes adatainak lekérése
    var posts = await getFlagedPostsD(result);
    res.status(201).json(posts); // Válasz küldése
  } else res.status(500).json({ msg: "Something went wrong!" }); // Hibaválasz küldése
}

// Jelzett bejegyzések részletes adatainak lekérése aszinkron módon
async function getFlagedPostsD(result) {
  let postData = [];
   // SQL lekérdezés a bejegyzés részletes adatainak lekérdezésére
  const sqlm = "SELECT post_id AS postID, author_name AS Authorname, post_title AS documentname, by_title AS byauthor, create_time AS sharetime FROM posts WHERE post_id = ?";

  // Minden bejegyzéshez lekérdezzük a részletes adatokat
  for (let i = 0; i < result.length; i++) {
    const result2 = await new Promise((resolve) => {
      conn.query(sqlm, [result[i].post_id], (err, res) => {
        resolve(res);
      });
    });
    // Ha vannak eredmények, hozzáadjuk a bejegyzés részletes adatait a listához
    if (result2.length > 0) {
        result2[0].flags = result[i].flags;
        postData.push(result2[0]);
    }
  }
  return postData; // Visszatérünk a bejegyzések részletes adataival
}

exports.getFlagedPosts = getFlagedPosts;
