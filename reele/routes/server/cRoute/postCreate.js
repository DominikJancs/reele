// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");
const multer = require('multer');
const pth = require('path');
const sharp = require('sharp');
var fs = require('fs');
var fsExtra = require('fs-extra');

// Adatbázis kapcsolat létrehozása
var conn = mysql.createConnection(setup.database);

// Multer konfigurációja a fájlok feltöltéséhez
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB a maximális fájlméret
    }
});

// Adatbázis kapcsolat ellenőrzése
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén dob egy hibát
});

// Új bejegyzés létrehozása
async function postCreate(req, res, next) {
    const userId = req.user.userid, // Felhasználó azonosítója
          userName = req.user.username, // Felhasználó neve
          clubId = req.club.clubid; // Klub azonosítója

    // Fájlok feltöltése és feldolgozása
    upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'file', maxCount: 1 }])(req, res, async function (err) {
        var chkAuth = await chkauth(conn, req.club.clubname, userId); // Jogosultság ellenőrzése
        var data = req.body.data.split(","); // Adatainak feldolgozása
        var chkExist = await chkexist(conn, data[0]); // Létezés ellenőrzése
        var chkGenre = await chkGenres(conn, req, data); // Műfaj ellenőrzése

        // Ha minden ellenőrzés sikeres
        if (chkAuth && chkGenre.value && chkExist) {
            // Könyvtárak létrehozása, ha nem léteznek
            var dir = `media/clubs/club_documents/covers/${req.club.clubname}`;
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

            var dir2 = `media/clubs/club_documents/documents/${req.club.clubname}`;
            if (!fs.existsSync(dir2)) fs.mkdirSync(dir2, { recursive: true });

            // Borító fájl ellenőrzése és feldolgozása
            var chkCover = chckFile(req.files['cover'][0], /jpeg|jpg|png/);
            const coverFileName = `${req.club.clubname}_${Date.now()}.png`;
            const coverPth = `media/clubs/club_documents/covers/${req.club.clubname}/${coverFileName}`;
            if (chkCover) {
                await sharp(req.files['cover'][0].buffer).png().resize({ width: 356, height: 512 }).toFile(`media/clubs/club_documents/covers/${req.club.clubname}/${coverFileName}`);
            }

            // Dokumentum fájl ellenőrzése és mentése
            var chkDocument = chckFile(req.files['file'][0], /pdf/);
            const documentFileName = `${req.club.clubname}_${Date.now()}.pdf`;
            const documentPth = `media/clubs/club_documents/documents/${req.club.clubname}/${documentFileName}`;
            if (chkDocument) {
                fs.writeFileSync(documentPth, req.files['file'][0].buffer);
            }

            // Bejegyzés mentése az adatbázisba
            var postFinalizeChk = await postFinalize(userId, userName, data[0], data[1], data[3], coverPth, documentPth, chkGenre.genreID, clubId);

            if (postFinalizeChk) (req.finalize = true, next());
            else {
                req.finalize = false;
                next();
            }
        } else {
            res.status(500).json({ msg: "Something went wrong!" });
        }
    });
}

// Bejegyzés végső mentése az adatbázisba
async function postFinalize(authorid, authorname, posttitle, bytitle, pageindex, coverpth, filepth, genreid, clubid) {
    try {
        // SQL lekérdezés futtatása a bejegyzés létrehozására
        const comm = 'INSERT INTO posts(author_id, author_name, post_title, by_title, page_index, cover_path, file_path, genre_id, club_id) values(?,?,?,?,?,?,?,?,?)';
        conn.query(comm, [authorid, authorname, posttitle, bytitle, pageindex, coverpth, filepth, genreid, clubid], (err, result) => {
            if (err) {
                console.error('Hiba történt az adatbázis művelet során:', err);
                return false;
            }
            console.log('Az adatbázis művelet sikeres volt.');
            return true;
        });
    }
    catch (error) {
        console.error('Hiba történt a feldolgozás során:', error);
        return false;
    }
}

// Jogosultság ellenőrzése
async function chkauth(conn, clubname, userid) {
    const sql = "SELECT * FROM clubs WHERE club_name = ? LIMIT 1";
    const result = await new Promise((resolve) => {
        conn.query(sql, [clubname], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) {
        var admin_id = result[0].club_admin;
        if (admin_id == userid) return true;
        else return false;
    }
    else return false;
}

// Létezés ellenőrzése
async function chkexist(conn, posttitle) {
    const sql = "SELECT * FROM posts WHERE LOWER(post_title) = ?";
    const result = await new Promise((resolve) => {
        conn.query(sql, [posttitle.toLowerCase()], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) return false;
    else return true;
}

// Műfaj ellenőrzése
async function chkGenres(conn, req, data) {
    const suggGenre = data[2],
          sql = "SELECT genre_id FROM genre_lib WHERE genre = ?";

    const result = await new Promise((resolve) => {
        conn.query(sql, [suggGenre], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) {
        var genre_id = result[0].genre_id,
        genres = [];

        const sqlm = "SELECT genre_id FROM genre_log WHERE club_id = ?";
        const result2 = await new Promise((resolve) => {
            conn.query(sqlm, [req.club.clubid], (err, res) => {
                resolve(res)
            });
        });

        result2.forEach(genre => {
            genres.push(genre.genre_id);
        });

        if (genres.includes(genre_id)) return {value: true, genreID: genre_id};
        else return {value: false, genreID: genre_id};
    }
    else {
        return {value: false, genreID: genre_id};
    }
}

// Fájl ellenőrzése
function chckFile(file, ext) {
    const filename = file.originalname;
    const extension = ext.test(pth.extname(filename).toLowerCase());
    const mime = ext.test(file.mimetype);

    if (extension && mime && filename.length > 0) return true;
    else return false;
}

// Függvény exportálása
exports.postCreate = postCreate;
