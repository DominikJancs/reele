// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");

// Adatbázis kapcsolat létrehozása és genreList inicializálása
var conn = mysql.createConnection(setup.database),
    genreList = [],
    genreLib = {};

// Adatbázis kapcsolat ellenőrzése
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén dob egy hibát
});

// Műfajok ellenőrzése middleware függvény
async function genreChk(req, res, next) {
    const genresCurr = req.body.genres; // Jelenlegi műfajok
    let genreChk = false; // Műfaj ellenőrzés eredménye (alapértelmezett: hamis)

    // Adott klubhoz tartozó műfajok lekérése
    const getgenre = getGenres(req);
    genreList = (await getgenre).genre; // Műfajok listája
    genreLib = (await getgenre).genre_lib; // Műfaj könyvtár

    // Ha a klubnak kevesebb, mint 2 műfaja van
    if (genreList.length < 2) genreChk = true;

    // Ellenőrzés, hogy minden megadott műfaj szerepel-e a klub műfajai között
    genresCurr.forEach(genre => {
        if (!genreList.includes(genre)) genreChk = true; // Ha a műfaj nem szerepel a listán, hiba
    });

    // Ha probléma van a műfajokkal
    if (genreChk) {
        res.status(500).json({ msg: "Something went wrong!" }); // Hibaüzenet küldése
    } else {
        req.genreLib = genreLib; // Műfaj könyvtár hozzárendelése a kéréshez
        next(); // Következő middleware-re továbbítás
    }
}

// Műfajok lekérdezése
async function getGenres(req) {
    const sql = "SELECT * FROM genre_lib"; // SQL lekérdezés a műfajokhoz
    const genres = []; // Műfajok tömbje

    // Lekérdezés végrehajtása és eredmény feldolgozása
    const result = await new Promise((resolve) => {
        conn.query(sql, [req.body.clubname], (err, res) => {
            resolve(res); // Lekérdezés eredményének visszaadása
        });
    });

    // Műfajok listába rendezése
    result.forEach(genre => {
        genres.push(genre.genre); // Műfaj hozzáadása a listához
    });

    return { genre_lib: result, genre: genres }; // Műfaj könyvtár és lista visszaadása
}

// Middleware függvény exportálása
exports.genreChk = genreChk;
