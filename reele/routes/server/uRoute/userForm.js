const mysql = require("mysql2"); // Importáljuk a MySQL csomagot
const setup = require("../setup"); // Importáljuk a beállításokat
const bcrypt = require('bcrypt'); // Importáljuk a bcrypt csomagot a jelszavak kezeléséhez
const salt = 10; // Só mértéke
const Juvenile = require("./juvenile"); // Importáljuk a Juvenile modult

/*---------Registration-----------------------------------------------------------------------*/
async function regU(req, res, next) {
    const juvenile = new Juvenile(null, req.body.username, req.body.email, req.body.password, null); // Létrehozunk egy Juvenile objektumot a regisztrációhoz
    const iconPth = "media/icons/default/default.svg"; // Alapértelmezett ikon útvonala

    try {
        // Adatbáziskapcsolat létrehozása
        var conn = mysql.createConnection(setup.database);
        conn.connect(function (err) {
            if (err) throw err;
        });

        // Ha a jelszavak egyeznek
        if (req.body.password == req.body.confirmPassword) {
            const comm = 'INSERT INTO users(user_name,email,password,u_icon_path) values(?,?,?,?)'; // SQL parancs a felhasználó regisztrációjához
            bcrypt.hash(req.body.password.toString(), salt, function (err, hash) {
                if (err) throw err;
                conn.query(comm, [req.body.username, req.body.email, hash, iconPth], (err, result) => {
                    if (err) throw err;
                    req.body.upcdata = {
                        userid: result.insertId,
                        username: juvenile.username,
                        email: juvenile.email,
                        icon: iconPth
                    }
                    req.body.msg = "Successfully registered!";
                    next();
                });
            });
        } else {
            res.status(400).json({ msg: "Password don't match" }); // Ha a jelszavak nem egyeznek, hibaüzenetet küldünk
        }
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong!" }); // Hiba esetén 500-as státuszkóddal válaszolunk
    }
}

/*---------Login--------------------------------------------------------------------------------------*/
async function signU(req, res, next) {
    if (req.admin == false) { // Ha nem admin
        try {
            const { email, password } = req.body;
            var conn = mysql.createConnection(setup.database);
            conn.connect(function (err) {
                if (err) throw err;
            });

            const sql = "SELECT * FROM users WHERE email = ?";
            conn.query(sql, [email], (err, result) => {
                if (err) throw err;
                if (result.length > 0) {
                    bcrypt.compare(password.toString(), result[0].password, (err, response) => {
                        if (err) throw err;
                        if (response) {
                            req.body.upcdata = {
                                userid: result[0].user_id,
                                username: result[0].user_name,
                                email: result[0].email,
                                icon: result[0].u_icon_path
                            }
                            req.body.msg = "Successfully logged!";
                            next();
                        } else {
                            res.status(401).send({ msg:"Password not matched!"}); // Rossz jelszó esetén hibaüzenet
                        }
                    });
                } else {
                    res.status(401).send({ msg:"Non-registered account!"}); // Nem regisztrált fiók esetén hibaüzenet
                }
            });
        } catch (error) {
            res.status(500).json({ msg: "Something went wrong!" }); // Hiba esetén 500-as státuszkóddal válaszolunk
        }           
    } else {
        next(); // Ha admin, folytassuk a következő middleware-t
    }
}
/*---------------------------------------------------------------------------------------------------*/

exports.regU = regU; // Az exporthoz rendeljük a regU függvényt
exports.signU = signU; // Az exporthoz rendeljük a signU függvényt
