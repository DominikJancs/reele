// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");
var clubdata = {};

// Adatbázis kapcsolat létrehozása
var conn = mysql.createConnection(setup.database);

// Adatbázis kapcsolat ellenőrzése
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén dob egy hibát
});

// Klub profil ellenőrző middleware függvény
async function clubAuthProfile(req, res, next) {
    var clubName = req.params.club; // Kérésből kinyert klub név

    // SQL lekérdezés klub adatok lekérdezésére a név alapján
    const sql = "SELECT * FROM clubs WHERE club_name = ? LIMIT 1";

    // SQL lekérdezés végrehajtása
    const result = await new Promise((resolve) => {
        conn.query(sql, [clubName], (err, res) => {
            resolve(res);
        });
    });

    // Ha vannak eredmények
    if (result.length > 0) {
        // Klub profil és banner útvonalának lekérése az adatbázisból
        var club_profile = result[0].c_icon_path,
            club_banner = result[0].banner_path;

        // Klub adatok összeállítása
        clubdata = {clubprofile: club_profile, clubbanner: club_banner};

        // Klub adatok hozzáadása a kéréshez
        req.club = clubdata;

        // Következő middleware-re továbbítás
        next();
    }
}

// Klub profil ellenőrző middleware exportálása
exports.clubAuthProfile = clubAuthProfile;
