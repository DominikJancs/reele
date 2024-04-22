const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
  if (err) throw err; 
});

async function checkFlagedPosts(req, res) {

  let postID = req.params.postID;  

  const del = 'DELETE FROM flags WHERE post_id = ?';
  const result = await new Promise((resolve) => {
    conn.query(del, [postID], (err, result) => {
      resolve(result);
    });
  });

  if (result) res.status(201).json({ msg: "Succesfully checked!" });
  else res.status(201).json({ msg: "This post may already checked!" });
}

exports.checkFlagedPosts = checkFlagedPosts;