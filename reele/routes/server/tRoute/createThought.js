// Szükséges modulok importálása
const mysql = require("mysql2"); // MySQL modul importálása
const setup = require("../setup"); // Beállítások importálása
const dateFormat = require("./dateFormat"); // dateFormat modul importálása
var conn = mysql.createConnection(setup.database); // MySQL kapcsolat létrehozása

// MySQL adatbáziskapcsolat létrehozása
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén hibaüzenet dobása
});

// Gondolat létrehozása
async function createthought(req, res) {
    try {
        const comm = 'INSERT INTO thoughts(post_id, user_id, context, t_page_pin) values(?,?,?,?)'; // Beszúrási parancs definiálása
        conn.query(comm, [req.postID, req.user.userid, req.body.thought, req.body.pages], async (err, result) => { // SQL lekérdezés végrehajtása
            var date = await dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s'); // Dátum formázása
            if (err) {
                res.status(500).json({ msg: "Something went wrong 1!", page: "", thoughted: date }); // Hiba esetén hibaüzenet küldése
            }
            else res.status(201).json({ msg: req.body.thought, page: req.body.pages, thoughted: date }); // Sikeres művelet esetén válasz küldése
        });
    }
    catch (error) {
        res.status(201).json({ msg: "Something went wrong 2 !", page: "", thoughted: date }); // Hiba esetén hibaüzenet küldése
    }
}

// Exportálás
exports.createthought = createthought; // Gondolat létrehozásának exportálása
