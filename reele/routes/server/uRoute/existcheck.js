const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function existchk(req, res, next) {
    var exist = null;
    const sqlM = "SELECT * FROM users WHERE email = ? LIMIT 1";
    const sqlU = "SELECT * FROM users WHERE user_name = ? LIMIT 1";
    var email = await chk(req.body.email, sqlM, "Email");
    var name = await chk(req.body.username, sqlU, "Username");
    exist = email.exist || name.exist;
    if (exist) res.status(404).send({ email: email.value, username: name.value }).json();
    else next();
}

async function chk(data, comm, type) {
    const result = await new Promise((resolve) => {
        conn.query(comm, [data], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) return { exist: true, value: `${type} was already taken!` };
    return { exist: false, value: "" };
}

exports.existchk = existchk;