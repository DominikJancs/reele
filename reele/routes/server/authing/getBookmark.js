// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");

// Adatbázis kapcsolat létrehozása
var conn = mysql.createConnection(setup.database);

// Adatbázis kapcsolat ellenőrzése
conn.connect(function (err) {
  if (err) throw err; // Hiba esetén dob egy hibát
});

// Könyvjelzők lekérdező middleware függvény
async function getBookMark(req, res, next) {
  var postTitle = req.params.post; // Kérésből kinyert bejegyzés címe

  // Ha a kérés tartalmazza a szükséges adatokat
  if (req.exist) {
    var userid = req.user.userid; // Felhasználó azonosítója

    // SQL lekérdezés a bejegyzés címének alapján
    const sql = "SELECT * FROM posts WHERE post_title = ? LIMIT 1";

    // SQL lekérdezés végrehajtása
    const result = await new Promise((resolve) => {
      conn.query(sql, [postTitle], (err, res) => {
        resolve(res);
      });
    });

    // Ha vannak eredmények
    if (result.length > 0) {
      var post_id = result[0].post_id; // Bejegyzés azonosítója

      // SQL lekérdezés a könyvjelzők ellenőrzésére
      const sqlm = "SELECT b_page_pin FROM bookmarks WHERE user_id = ? AND post_id = ?";

      // SQL lekérdezés végrehajtása
      const result2 = await new Promise((resolve) => {
        conn.query(sqlm, [userid, post_id], (err, res) => {
          resolve(res);
        });
      });

      // Ha vannak könyvjelzők az adott bejegyzéshez
      if (result2.length > 0) {
        var bookmark = await bookmarkArr(result2); // Könyvjelzők tömbjének létrehozása
        req.bookmark = bookmark; // Könyvjelzők hozzáadása a kéréshez
        next(); // Következő middleware-re továbbítás
      } else {
        req.bookmark = []; // Üres könyvjelzők tömbje a kéréshez
        next(); // Következő middleware-re továbbítás
      }
    }
  } else {
    req.bookmark = []; // Üres könyvjelzők tömbje a kéréshez
    next(); // Következő middleware-re továbbítás
  }
}

// Könyvjelzők tömbjének létrehozása
async function bookmarkArr(bookmark) {
  var bookmarkArr = [];
  for (let i = 0; i < bookmark.length; i++) {
    bookmarkArr.push(bookmark[i].b_page_pin);
  }
  return bookmarkArr; // Könyvjelzők tömbjének visszaadása
}

// Könyvjelzők lekérdező middleware exportálása
exports.getBookMark = getBookMark;
