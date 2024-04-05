const mysql = require("mysql2");
const setup = require("../setup");
const multer = require('multer');
const pth = require('path');
const sharp = require('sharp');
var fs = require('fs');
var fsExtra = require('fs-extra');
var conn = mysql.createConnection(setup.database);
const storage = multer.memoryStorage();

//setup
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024 //2MB max
    },
    fileFilter: function (req, file, cb) {
        chckFile(file, cb, /jpeg|jpg|png/);
    }
});

conn.connect(function (err) {
    if (err) throw err;
});

async function clubBannerUp(req, res, next) {
    const userId = req.user.userid;

    const sql = "SELECT * FROM users WHERE user_id = ?";
    conn.query(sql, [userId], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            upload.single('icon')(req, res, async function (err) {
                var target_clubName = req.body.target;
                console.log(target_clubName);
                var chkAuth = chkauth(conn, target_clubName, userId);
                console.log(chkAuth);

                if (chkAuth) {
                    var dir = `media/clubs/club_banners/${target_clubName}`;
                    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                    else fsExtra.emptyDirSync(dir);

                    const fileName = `${target_clubName}_${Date.now()}.png`;
                    await sharp(req.file.buffer).png().resize({ width: 512, height: 256 }).toFile(`media/clubs/club_banners/${target_clubName}/${fileName}`);
                    const iconPth = `media/clubs/club_banners/${target_clubName}/${fileName}`;

                    const sql = "UPDATE clubs SET banner_path = ? WHERE club_name = ?";
                    conn.query(sql, [iconPth, target_clubName], (err, result) => {

                    });
                    (req.finalize = true, next());
                }
            });
        }
    });
}

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

function chckFile(file, cb, ext) {
    const filename = file.originalname;
    const extension = ext.test(pth.extname(filename).toLowerCase());
    const mime = ext.test(file.mimetype);

    if (extension && mime && filename.length > 0) return cb(null, true);
    else cb(new Error("The file isn't an image"));
}

exports.clubBannerUp = clubBannerUp;