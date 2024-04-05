// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");

// Adatbázis kapcsolat létrehozása
var conn = mysql.createConnection(setup.database);

// Adatbázis kapcsolat ellenőrzése
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén dob egy hibát
});

// Felhasználó csatlakoztatása vagy lecsatlakoztatása egy klubhoz
async function joincreate(req, res) {
    var clubName = req.params.club; // Keresett klub neve
    var userid = req.user.userid; // Felhasználó azonosítója

    // Klub létezésének ellenőrzése
    const sql = "SELECT * FROM clubs WHERE club_name = ? LIMIT 1";
    const result = await new Promise((resolve) => {
        conn.query(sql, [clubName], (err, res) => {
            resolve(res); // Lekérdezés eredményének visszaadása
        });
    });

    // Ha találunk eredményt (klub létezik)
    if (result.length > 0) {
        const sqlm = "SELECT * FROM joins WHERE user_id = ? AND club_id = ? LIMIT 1"; // SQL lekérdezés a felhasználó csatlakozásának ellenőrzésére
        var club_id = result[0].club_id; // Klub azonosítója

        // Felhasználó csatlakozásának lekérdezése
        const result2 = await new Promise((resolve) => {
            conn.query(sqlm, [userid, club_id], (err, res) => {
                resolve(res); // Lekérdezés eredményének visszaadása
            });
        });

        // Ha találunk eredményt (a felhasználó már csatlakozott)
        if (result2.length > 0) {
            const del = 'DELETE FROM joins WHERE user_id = ? AND club_id = ?'; // SQL lekérdezés a felhasználó leszatalkoztatására
            conn.query(del, [userid, club_id], (err, result) => {
                if (err) throw err; // Hiba esetén dob egy hibát
            });
            handleClubJoins(club_id, -1); // Klub csatlakozásainak kezelése
            res.status(201).json({ value: "Join" }); // "Join" érték küldése JSON formátumban
        } else {
            const comm = 'INSERT INTO joins(user_id, club_id) values(?,?)'; // SQL lekérdezés a felhasználó csatlakoztatására
            conn.query(comm, [userid, club_id], (err, result) => {
                if (err) throw err; // Hiba esetén dob egy hibát
            });
            handleClubJoins(club_id, 1); // Klub csatlakozásainak kezelése
            res.status(201).json({ value: "Joined" }); // "Joined" érték küldése JSON formátumban
        }
    } else {
        res.status(500).json({ msg: "Something went wrong!" }); // Hibaüzenet küldése
    }
}

// Klub csatlakozásainak kezelése
async function handleClubJoins(clubID, value) {
    const sql = "UPDATE clubs SET join_count = join_count + ? WHERE club_id = ?"; // SQL lekérdezés a klub csatlakozásainak frissítésére
    conn.query(sql, [value, clubID], (err, result) => {
        // Hiba esetén dob egy hibát
    });
}

// Függvény exportálása
exports.joincreate = joincreate;
