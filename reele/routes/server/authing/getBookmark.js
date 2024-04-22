const mysql = require("mysql2");
const setup = require("../setup");

var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
  if (err) throw err; 
});

async function getBookMark(req, res, next) {
  var postTitle = req.params.post; 

  if (req.exist) {
    var userid = req.user.userid; 

    const sql = "SELECT * FROM posts WHERE post_title = ? LIMIT 1";

    const result = await new Promise((resolve) => {
      conn.query(sql, [postTitle], (err, res) => {
        resolve(res);
      });
    });

    if (result.length > 0) {
      var post_id = result[0].post_id; 

      const sqlm = "SELECT b_page_pin FROM bookmarks WHERE user_id = ? AND post_id = ?";

      const result2 = await new Promise((resolve) => {
        conn.query(sqlm, [userid, post_id], (err, res) => {
          resolve(res);
        });
      });

      if (result2.length > 0) {
        var bookmark = await bookmarkArr(result2); 
        req.bookmark = bookmark; 
        next(); 
      } else {
        req.bookmark = []; 
        next(); 
      }
    }
  } else {
    req.bookmark = []; 
    next(); 
  }
}

async function bookmarkArr(bookmark) {
  var bookmarkArr = [];
  for (let i = 0; i < bookmark.length; i++) {
    bookmarkArr.push(bookmark[i].b_page_pin);
  }
  return bookmarkArr; 
}

exports.getBookMark = getBookMark;