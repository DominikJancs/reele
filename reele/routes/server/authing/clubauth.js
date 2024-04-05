const mysql = require("mysql2");
const setup = require("../setup");
var clubdata = {};
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

// Klub hitelesítési middleware függvény
async function clubAuth(req, res, next) {
    var clubName = req.params.club;
    userid = req.user.userid;

    //Clubból a felhasználók kiválasztása club név szerint
    const sql = "SELECT * FROM clubs WHERE club_name = ? LIMIT 1";
    const result = await new Promise((resolve) => {
        conn.query(sql, [clubName], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) {
        //Az adott csatlakozás kiválasztása és ellenőzése
        const sqlm = "SELECT * FROM joins WHERE user_id = ? AND club_id = ? LIMIT 1";
        var club_id = result[0].club_id,
            club_admin = result[0].club_admin,
            club_name = result[0].club_name,
            club_profile = result[0].c_icon_path,
            club_banner = result[0].banner_path;

        const result2 = await new Promise((resolve) => {
            conn.query(sqlm, [userid, club_id], (err, res) => {
                resolve(res)
            });
        });
        if (result2.length > 0) {
            clubdata = { clubid: club_id, clubname: club_name, clubprofile: club_profile, clubbanner: club_banner }
            req.club = clubdata;
            next();
        }
        else res.status(404).json({ msg: "Request denied!" });
    }
    else res.status(404).json({ msg: "Something went wrong!" });
}

exports.clubAuth = clubAuth;