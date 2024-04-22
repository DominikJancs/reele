const mysql = require("mysql2"); 
const setup = require("../setup");
const bcrypt = require('bcrypt'); 
const salt = 10; 
const Juvenile = require("./juvenile"); 

/*---------Registration-----------------------------------------------------------------------*/
async function regU(req, res, next) {
    const juvenile = new Juvenile(null, req.body.username, req.body.email, req.body.password, null); 
    const iconPth = "media/icons/default/default.svg"; 

    try {

        var conn = mysql.createConnection(setup.database);
        conn.connect(function (err) {
            if (err) throw err;
        });

        if (req.body.password == req.body.confirmPassword) {
            const comm = 'INSERT INTO users(user_name,email,password,u_icon_path) values(?,?,?,?)';
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
            res.status(400).json({ msg: "Password don't match" }); 
        }
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong!" });
    }
}

/*---------Login--------------------------------------------------------------------------------------*/
async function signU(req, res, next) {
    if (req.admin == false) { 
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
                            res.status(401).send({ msg:"Password not matched!"});
                        }
                    });
                } else {
                    res.status(401).send({ msg:"Non-registered account!"}); 
                }
            });
        } catch (error) {
            res.status(500).json({ msg: "Something went wrong!" }); 
        }           
    } else {
        next(); 
    }
}
/*---------------------------------------------------------------------------------------------------*/

exports.regU = regU; // Az exporthoz rendeljük a regU függvényt
exports.signU = signU; // Az exporthoz rendeljük a signU függvényt
