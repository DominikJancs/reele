const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
  if (err) throw err;
});

// Jelzett klubok lekérdezése aszinkron módon
async function getFlagedClubs(req, res) {
    // SQL lekérdezés a jelzett klubok lekérdezésére és összesítésére
  const sql = "SELECT club_id, COUNT(*) AS flags FROM flags GROUP BY club_id";
    // Lekérdezés végrehajtása és eredmények megvárása
  const result = await new Promise((resolve) => {
    conn.query(sql, (err, res) => {
      resolve(res);
    });
  });
  // Ha vannak eredmények
  if (result.length > 0) {
    // Jelzett klubok részletes adatainak lekérése
    var clubs = await getFlagedClubD(result);
    res.status(201).json(clubs); // Válasz küldése
  } else res.status(500).json({ msg: "Something went wrong!" }); // Hibaválasz küldése
}

// Jelzett klubok részletes adatainak lekérése aszinkron módon
async function getFlagedClubD(result) {
  let clubData = [];
  // SQL lekérdezés a klub részletes adatainak lekérdezésére
  const sqlm = "SELECT club_id AS clubID, club_name AS club FROM clubs WHERE club_id = ?";

  // Minden klubhoz lekérdezzük a részletes adatokat
  for (let i = 0; i < result.length; i++) {
    const result2 = await new Promise((resolve) => {
      conn.query(sqlm, [result[i].club_id], (err, res) => {
        resolve(res);
      });
    });
    // Ha vannak eredmények, hozzáadjuk a klub részletes adatait a listához
    if (result2.length > 0) {
      result2[0].flags = result[i].flags;
      clubData.push(result2[0]);
    }
  }
  return clubData; // Visszatérünk a klubok részletes adataival
}

exports.getFlagedClubs = getFlagedClubs;
