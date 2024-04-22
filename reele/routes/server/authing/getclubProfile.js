const mysql = require("mysql2");
const setup = require("../setup");
var clubdata = {};

var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err; 
});

async function clubAuthProfile(req, res, next) {
    var clubName = req.params.club; 

    const sql = "SELECT * FROM clubs WHERE club_name = ? LIMIT 1";

    const result = await new Promise((resolve) => {
        conn.query(sql, [clubName], (err, res) => {
            resolve(res);
        });
    });

    if (result.length > 0) {

        var club_profile = result[0].c_icon_path,
            club_banner = result[0].banner_path;

        clubdata = {clubprofile: club_profile, clubbanner: club_banner};

        req.club = clubdata;

        next();
    }
}

exports.clubAuthProfile = clubAuthProfile;