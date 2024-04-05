// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");

// Adatbázis kapcsolat létrehozása
var conn = mysql.createConnection(setup.database);

// Adatbázis kapcsolat ellenőrzése
conn.connect(function (err) {
  if (err) throw err; // Hiba esetén dob egy hibát
});

// Legfeljebb 5 klub lekérdezése, rendezve a csatlakozó tagok száma szerint
async function gettop5(req, res) {
  const sql =
    "SELECT club_name AS club FROM clubs ORDER BY join_count DESC LIMIT 5"; // SQL lekérdezés a klubok lekérdezésére
  const result = await new Promise((resolve) => {
    conn.query(sql, (err, res) => {
      resolve(res); // Lekérdezés eredményének visszaadása
    });
  });

  // Ha van eredmény (klubokat találtunk)
  if (result) {
    if (result.length > 0) {
      res.status(201).json(result); // Klubok küldése JSON formátumban
    } else {
      res.status(500).json({ msg: "Something went wrong!" }); // Ha nincs eredmény, hibaüzenet küldése
    }
  } else {
    res.status(500).json({ msg: "Something went wrong!" }); // Hibaüzenet küldése
  }
}

// Függvény exportálása
exports.gettop5 = gettop5;
