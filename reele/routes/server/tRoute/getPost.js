// Importáljuk a szükséges MySQL csomagot
const mysql = require("mysql2");

// Importáljuk a beállításokat, hogy kapcsolódhassunk az adatbázishoz
const setup = require("../setup");

// Létrehozunk egy üres objektumot a klubadatok tárolására
var clubdata = {};

// Létrehozzuk a kapcsolatot az adatbázissal
var conn = mysql.createConnection(setup.database);

// Kapcsolódunk az adatbázishoz
conn.connect(function (err) {
    if (err) throw err;
});

// Az aszinkron funkció, amely lekéri a bejegyzést a kérés alapján
async function getPost(req, res, next) {
    // A kéréstől kapott bejegyzés címe
    var postTitle= req.params.post;

    // SQL lekérdezés összeállítása, ami a bejegyzést keresi cím alapján
    const sql = "SELECT * FROM posts WHERE post_title = ? LIMIT 1";

    // Az SQL lekérdezés aszinkron végrehajtása
    const result = await new Promise((resolve) => {
        conn.query(sql, [postTitle], (err, res) => {
            resolve(res)
        });
    });

    // Ha van eredmény, beállítjuk a bejegyzés azonosítóját a kérésben
    if (result.length > 0) {
        var post_id = result[0].post_id;
        req.postID = post_id;
        console.log(post_id) // Kiírjuk a bejegyzés azonosítóját a konzolra
        next(); // Átadjuk a vezérlést a következő middleware-nek
    } else {
        // Ha nincs eredmény, 500-as hibaüzenetet küldünk vissza
        res.status(500).json({ msg: "Something went wrong!" });
    }
}

// Az exporthoz rendeljük a getPost függvényt
exports.getPost = getPost;
