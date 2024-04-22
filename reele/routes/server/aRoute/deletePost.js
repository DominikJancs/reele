const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
  if (err) throw err; 
});

async function deleteFlagedPosts(req, res) {
  let postID = req.params.postID;

  const del = 'DELETE FROM posts WHERE post_id = ?';

  const result = await new Promise((resolve) => {
    conn.query(del, [postID], (err, result) => {
      resolve(result);
    });
  });

  if (result) res.status(201).json({ msg: "Succesfully deleted!" });
  else res.status(201).json({ msg: "Something went wrong!" });
}

exports.deleteFlagedPosts = deleteFlagedPosts;