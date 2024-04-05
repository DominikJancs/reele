// Szükséges modulok importálása
const mysql = require("mysql2"); // MySQL modul importálása
const setup = require("../setup"); // Beállítások importálása
const multer = require('multer'); // Fájlfeltöltés kezelése
const pth = require('path'); // Útvonalak kezelése
const sharp = require('sharp'); // Képek manipulálása
var fs = require('fs'); // Fájlrendszer műveletek
var fsExtra = require('fs-extra'); // Bővített fájlrendszer műveletek
var conn = mysql.createConnection(setup.database); // MySQL kapcsolat létrehozása
const storage = multer.memoryStorage(); // Fájlfeltöltés memóriatárban történő tárolása

// Fájlfeltöltés beállítása
const upload = multer({
    storage: storage, // Fájlfeltöltés tárolása
    limits: {
        fileSize: 2 * 1024 * 1024 // Maximum 2MB méretű fájl feltöltése
    },
    fileFilter: function (req, file, cb) {
        chckFile(file, cb, /jpeg|jpg|png/); // Fájlfeltöltés ellenőrzése
    }
});

// MySQL adatbáziskapcsolat létrehozása
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén hibaüzenet dobása
});

// Klubikonok feltöltése
async function clubIcUp(req, res, next) {
    const userId = req.user.userid; // Felhasználó azonosítójának lekérése

    const sql = "SELECT * FROM users WHERE user_id = ?"; // SQL lekérdezés előkészítése
    conn.query(sql, [userId], (err, result) => { // SQL lekérdezés végrehajtása
        if (err) throw err; // Hiba esetén hibaüzenet dobása
        if (result.length > 0) { // Ha eredmény van
            upload.single('icon')(req, res, async function (err) { // Egyetlen ikon feltöltése
                //if (err) return res.status(500).json(err);
                var target_clubName = req.body.target; // Célklub név lekérése
                console.log(target_clubName); // Célklub név naplózása
                var chkAuth = chkauth(conn, target_clubName, userId); // Jogosultságok ellenőrzése
                console.log(chkAuth); // Jogosultságok naplózása

                if (chkAuth) { // Ha jogosultságok rendben vannak
                    var dir = `media/clubs/club_icons/${target_clubName}`; // Mappa elérési útjának meghatározása
                    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); // Ha a mappa nem létezik, létrehozása
                    else fsExtra.emptyDirSync(dir); // Mappa tartalmának törlése

                    const fileName = `${target_clubName}_${Date.now()}.png`; // Fájlnév készítése
                    await sharp(req.file.buffer).png().resize({ width: 256, height: 256 }).toFile(`media/clubs/club_icons/${target_clubName}/${fileName}`); // Fájl manipuláció
                    const iconPth = `media/clubs/club_icons/${target_clubName}/${fileName}`; // Fájl elérési útjának meghatározása

                    const sql = "UPDATE clubs SET c_icon_path = ? WHERE club_name = ?"; // SQL lekérdezés előkészítése
                    conn.query(sql, [iconPth, target_clubName], (err, result) => { // SQL lekérdezés végrehajtása

                    });
                    (req.finalize = true, next()); // Végezetül hívjuk a következő middleware-t
                }
            });
        }
    });
}

// Jogosultságok ellenőrzése
async function chkauth(conn, clubname, userid) {
    const sql = "SELECT * FROM clubs WHERE club_name = ? LIMIT 1"; // SQL lekérdezés előkészítése
    const result = await new Promise((resolve) => { // Várakoztatás
        conn.query(sql, [clubname], (err, res) => { // SQL lekérdezés végrehajtása
            resolve(res)
        });
    });
    if (result.length > 0) { // Ha eredmény van
        var admin_id = result[0].club_admin; // Klubadminisztrátor azonosítójának lekérése
        if (admin_id == userid) return true; // Ha a felhasználó klubadminisztrátor, visszatérés igazzal
        else return false; // Egyébként visszatérés hamissal
    }
    else return false; // Egyébként visszatérés hamissal
}

// Fájltípus ellenőrzése
function chckFile(file, cb, ext) {
    const filename = file.originalname; // Eredeti fájlnév lekérése
    const extension = ext.test(pth.extname(filename).toLowerCase()); // Fájlkiterjesztés ellenőrzése
    const mime = ext.test(file.mimetype); // MIME típus ellenőrzése

    if (extension && mime && filename.length > 0) return cb(null, true); // Ha a feltételek teljesülnek, hívjuk a callback függvényt
    else cb(new Error("The file isn't an image")); // Egyébként hibaüzenet dobása
}

// Exportálás
exports.clubIcUp = clubIcUp; // Klubikonok feltöltésének exportálása
