const mysql = require("mysql2");
const setup = require("../setup");
var clubdata = {};
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function clubPauth(req, res, next) {
    var clubName = req.params.club;

    const sql = "SELECT * FROM clubs WHERE club_name = ? LIMIT 1";
    const result = await new Promise((resolve) => {
        conn.query(sql, [clubName], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) {
        var club_id = result[0].club_id,
            club_admin = result[0].club_admin,
            club_name = result[0].club_name,
            club_profile = result[0].c_icon_path,
            club_banner = result[0].banner_path;

        clubdata = { clubid: club_id, clubname: club_name, clubprofile: club_profile, clubbanner: club_banner }
        req.club = clubdata;
        next();
    }
    else res.status(500).json({ msg: "Something went wrong!" });
}

exports.clubPauth = clubPauth;