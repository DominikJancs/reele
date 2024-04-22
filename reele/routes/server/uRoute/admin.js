
const mysql = require("mysql2");


const setup = require("../setup");


const jwt = require("jsonwebtoken");


async function chkA(req, res, next) {
  try {

    const { email, password } = req.body;


    var conn = mysql.createConnection(setup.database);


    conn.connect(function (err) {
      if (err) throw err;
    });


    const sql = "SELECT * FROM admins WHERE email = ? AND password = ? LIMIT 1";


    conn.query(sql, [email, password], (err, result) => {
      if (err) throw err;


      if (result.length > 0) {
        req.admin = true; 
        req.body.msg = `Successfully logged as ${result[0].admin_name}!`; 
        req.body.upcdata = { name: result[0].admin_name }; 
        next(); 
      } else {
        req.admin = false; 
        next(); 
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!" });
  }
}

exports.chkA = chkA;
