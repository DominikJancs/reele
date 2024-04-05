// Importáljuk a MySQL csomagot
const mysql = require("mysql2");

// Importáljuk a beállításokat
const setup = require("../setup");

// Importáljuk a JWT csomagot
const jwt = require("jsonwebtoken");

// Az aszinkron funkció, ami ellenőrzi az admin bejelentkezést
async function chkA(req, res, next) {
  try {
    // Felhasználónév és jelszó kinyerése a kérésből
    const { email, password } = req.body;

    // Kapcsolat létrehozása az adatbázissal
    var conn = mysql.createConnection(setup.database);

    // Kapcsolódunk az adatbázishoz
    conn.connect(function (err) {
      if (err) throw err;
    });

    // SQL lekérdezés összeállítása az admin bejelentkezésének ellenőrzéséhez
    const sql = "SELECT * FROM admins WHERE email = ? AND password = ? LIMIT 1";

    // SQL lekérdezés végrehajtása
    conn.query(sql, [email, password], (err, result) => {
      if (err) throw err;

      // Ha van eredmény
      if (result.length > 0) {
        req.admin = true; // Beállítjuk, hogy az admin be van jelentkezve
        req.body.msg = `Successfully logged as ${result[0].admin_name}!`; // Visszajelzés a sikeres bejelentkezésről
        req.body.upcdata = { name: result[0].admin_name }; // Frissítjük az admin nevét az adatokban
        next(); // Átadjuk a vezérlést a következő middleware-nek
      } else {
        req.admin = false; // Beállítjuk, hogy az admin nincs bejelentkezve
        next(); // Átadjuk a vezérlést a következő middleware-nek
      }
    });
  } catch (error) {
    // Hiba esetén 500-as státuszkódú választ küldünk
    res.status(500).json({ msg: "Something went wrong!" });
  }
}

// Az exporthoz rendeljük a chkA függvényt
exports.chkA = chkA;
