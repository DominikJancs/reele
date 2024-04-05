const mysql = require("mysql2"); // Importáljuk a MySQL csomagot
const setup = require("../setup"); // Importáljuk a beállításokat

// Létrehozunk egy kapcsolatot az adatbázissal
var conn = mysql.createConnection(setup.database);

// Kapcsolódunk az adatbázishoz
conn.connect(function (err) {
    if (err) throw err;
});

// Az aszinkron funkció, ami ellenőrzi a felhasználói adatok létezését
async function existchk(req, res, next) {
    var existname = null;
    var existemail = null;

    // SQL lekérdezés az email cím ellenőrzéséhez
    const sqlM = "SELECT * FROM users WHERE email = ? LIMIT 1";

    // SQL lekérdezés a felhasználónév ellenőrzéséhez
    const sqlU = "SELECT * FROM users WHERE user_name = ? LIMIT 1";

    // Email cím ellenőrzése
    var email = await chk(req.body.email, sqlM, "Email");

    // Felhasználónév ellenőrzése
    var name = await chk(req.body.username, sqlU, "Username");

    existname = name.exist;
    existemail = email.exist;

    // Megfelelő válasz küldése az ellenőrzés eredményének függvényében
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

// Az aszinkron funkció, ami végrehajtja az adatbázis ellenőrzést
async function chk(data, comm, type) {
    const result = await new Promise((resolve) => {
        conn.query(comm, [data], (err, res) => {
            resolve(res);
        });
    });

    // Ha van eredmény, akkor az adott adat már foglalt
    if (result.length > 0) {
        return { exist: true, value: `${type} was already taken!` };
    }

    // Ha nincs eredmény, akkor az adott adat még nem foglalt
    return { exist: false, value: "" };
}

// Az exporthoz rendeljük az existchk függvényt
exports.existchk = existchk;
