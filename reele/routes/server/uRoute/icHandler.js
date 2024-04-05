const mysql = require("mysql2"); // Importáljuk a MySQL csomagot
const setup = require("../setup"); // Importáljuk a beállításokat
const multer = require('multer'); // Importáljuk a multer csomagot a fájlkezeléshez
const pth = require('path'); // Importáljuk a path csomagot a fájl útvonalakhoz
const sharp = require('sharp'); // Importáljuk a sharp csomagot az képmanipulációhoz
var fs = require('fs'); // Importáljuk a fs csomagot a fájlrendszer kezeléséhez
var fsExtra = require('fs-extra'); // Importáljuk a fs-extra csomagot a kiterjesztett fájlrendszer kezeléséhez

// Létrehozunk egy kapcsolatot az adatbázissal
var conn = mysql.createConnection(setup.database);

// Kapcsolódunk az adatbázishoz
conn.connect(function (err) {
    if (err) throw err;
});

// Az aszinkron funkció, ami kezeli a felhasználói ikonokat
async function iconHandle(req, res, next) {
    const user = req.user.username; // Felhasználónév kinyerése a kérésből
    const userId = req.user.userid; // Felhasználó azonosítójának kinyerése a kérésből
    const storage = multer.memoryStorage(); // Memóriában tároljuk a feltöltött fájlt

    // Beállítjuk a multer konfigurációt
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 2 * 1024 * 1024 // 2 MB a maximális fájlméret
        },
        fileFilter: function(_req, file, cb){
            chckFile(file, cb, /jpeg|jpg|png/); // Ellenőrizzük a fájl típusát
        }
    });

    // SQL lekérdezés a felhasználó adatainak lekéréséhez
    const sql = "SELECT * FROM users WHERE user_id = ?";
    conn.query(sql, [userId], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            var dir = `media/icons/${result[0].user_name}`;

            // Ellenőrizzük, hogy létezik-e a mappa, ha nem, létrehozzuk, ha igen, töröljük a tartalmát
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            else fsExtra.emptyDirSync(dir);

            // Fájl feltöltése és ikonok kezelése
            upload.single('icon')(req, res, async function (err) {
                if (err) return res.status(500).json(err);

                // Fájl nevének és elérési útvonalának beállítása
                const fileName = `${user}_${Date.now()}.png`;
                await sharp(req.file.buffer).png().resize({ width: 256, height: 256 }).toFile(`media/icons/${user}/${fileName}`);
                const iconPth = `media/icons/${result[0].user_name}/${fileName}`;

                // Felhasználói adatok frissítése
                req.body.upcdata = {
                    userid: result[0].user_id,
                    username: result[0].user_name,
                    email: result[0].email,
                    icon: iconPth
                }
                req.body.msg = "Successfully updated!";

                // Felhasználói ikon útvonalának frissítése az adatbázisban
                const sql = "UPDATE users SET u_icon_path = ? WHERE user_name = ?";
                conn.query(sql, [iconPth, user], (err, result) => {
                    //
                });
                next(); // Következő middleware-re átadás
            });
        }
    });
}

// Fájl típusának ellenőrzése
function chckFile(file, cb, ext) {
    const filename = file.originalname;
    const extension = ext.test(pth.extname(filename).toLowerCase());
    const mime = ext.test(file.mimetype);

    if (extension && mime && filename.length > 0) return cb(null, true);
    else cb(new Error("The file isn't an image"));
}

// Az exporthoz rendeljük az iconHandle függvényt
exports.iconHandle = iconHandle;
