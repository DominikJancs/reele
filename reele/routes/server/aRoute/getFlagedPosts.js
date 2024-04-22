const mysql = require("mysql2");
const setup = require("../setup");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
  if (err) throw err;
});

async function getFlagedPosts(req, res) {

  let clubID = req.params.clubID;

  const sql = "SELECT post_id, COUNT(*) AS flags FROM flags WHERE club_id = ? GROUP BY post_id";

  const result = await new Promise((resolve) => {
    conn.query(sql, [clubID], (err, res) => {
      resolve(res);
    });
  });

  if (result.length > 0) {

    var posts = await getFlagedPostsD(result);
    res.status(201).json(posts); 
  } else res.status(500).json({ msg: "Something went wrong!" }); 
}

async function getFlagedPostsD(result) {
  let postData = [];

  const sqlm = "SELECT post_id AS postID, author_name AS Authorname, post_title AS documentname, by_title AS byauthor, create_time AS sharetime FROM posts WHERE post_id = ?";

  for (let i = 0; i < result.length; i++) {
    const result2 = await new Promise((resolve) => {
      conn.query(sqlm, [result[i].post_id], (err, res) => {
        resolve(res);
      });
    });

    if (result2.length > 0) {
        result2[0].flags = result[i].flags;
        postData.push(result2[0]);
    }
  }
  return postData; 
}

exports.getFlagedPosts = getFlagedPosts;