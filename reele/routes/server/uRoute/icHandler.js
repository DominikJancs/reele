const mysql = require("mysql2");
const setup = require("../setup");
const multer = require('multer');
const pth = require('path');
const sharp = require('sharp');
var fs = require('fs');
var fsExtra = require('fs-extra');

//Create con with the DB
var conn = mysql.createConnection(setup.database);
conn.connect(function (err) {
    if (err) throw err;
});

async function iconHandle(req, res, next) {
    const user = req.user.username;
    const userId = req.user.userid;
    const storage = multer.memoryStorage();

    //setup
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 2 * 1024 * 1024 //2MB max
        },
        fileFilter: function(_req, file, cb){
            chckFile(file, cb);
        }
    });

    const sql = "SELECT * FROM users WHERE user_id = ?";
    conn.query(sql, [userId], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            var dir = `routes/server/media/icons/${result[0].user_name}`;
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            else fsExtra.emptyDirSync(dir);

            upload.single('icon')(req, res, async function (err) {
                if (err) return res.status(500).json(err);
                
                const fileName = `${user}_${Date.now()}.png`;
                await sharp(req.file.buffer).png().resize({ width: 256, height: 256 }).toFile(`routes/server/media/icons/${user}/${fileName}`);
                const iconPth = `media/icons/${result[0].user_name}/${fileName}`;

                req.body.upcdata = {
                    userid: result[0].user_id,
                    username: result[0].user_name,
                    email: result[0].email,
                    icon: iconPth
                }
                req.body.msg = "Successfully updated!";

                const sql = "UPDATE users SET u_icon_path = ? WHERE user_name = ?";
                conn.query(sql, [iconPth, user], (err, result) => {
                    //
                });
                next();
            });
        }
    });
}

function chckFile(file, cb) {
    const allowedEXT = /jpeg|jpg|png/;
    const filename = file.originalname;
    const ext = allowedEXT.test(pth.extname(filename).toLowerCase());
    const mime = allowedEXT.test(file.mimetype);

    if (ext && mime && filename.length > 0) return cb(null, true);
    else cb(new Error("The file isn't an image"));
}

exports.iconHandle = iconHandle;