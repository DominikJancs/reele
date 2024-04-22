const mysql = require("mysql2"); 
const setup = require("../setup"); 

var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function existchk(req, res, next) {
    var existname = null;
    var existemail = null;

    const sqlM = "SELECT * FROM users WHERE email = ? LIMIT 1";

    const sqlU = "SELECT * FROM users WHERE user_name = ? LIMIT 1";

    var email = await chk(req.body.email, sqlM, "Email");

    var name = await chk(req.body.username, sqlU, "Username");

    existname = name.exist;
    existemail = email.exist;

    if (existname && !existemail) {
        res.status(404).send({ msg: "Az adott felhasználónév már foglalt!" }).json();
    } else if (!existname && existemail) {
        res.status(404).send({ msg: "Az adott email már foglalt!" }).json();
    } else if (existname && existemail) {
        res.status(404).send({ msg: "Az adott email és felhasználónév már foglalt!" }).json();
    } else {
        next();
    }
}

async function chk(data, comm, type) {
    const result = await new Promise((resolve) => {
        conn.query(comm, [data], (err, res) => {
            resolve(res);
        });
    });

    if (result.length > 0) {
        return { exist: true, value: `${type} was already taken!` };
    }

    return { exist: false, value: "" };
}

exports.existchk = existchk;