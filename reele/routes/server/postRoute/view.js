const mysql = require("mysql2"); 
const setup = require("../setup"); 
var conn = mysql.createConnection(setup.database); 

conn.connect(function (err) {
    if (err) throw err; 
});

async function viewcreate(req, res, next) {
    var postTitle = req.params.post;

    if (req.exist) {
        var userid = req.user.userid;

        const sql = "SELECT * FROM posts WHERE post_title = ? LIMIT 1";
        const result = await new Promise((resolve) => {
            conn.query(sql, [postTitle], (err, res) => {
                resolve(res)
            });
        });

        if (result.length > 0) {
            const sqlm = "SELECT * FROM views WHERE user_id = ? AND post_id = ? LIMIT 1";
            var post_id = result[0].post_id;

            const result2 = await new Promise((resolve) => {
                conn.query(sqlm, [userid, post_id], (err, res) => {
                    resolve(res)
                });
            });

            if (result2.length == 0) {
                const comm = 'INSERT INTO views(user_id, post_id) values(?,?)';
                conn.query(comm, [userid, post_id], (err, result) => {
                    if (err) throw err;
                });
                handlePostReel(post_id, 1); 
                next();
            }
            else next();
        }
    }
    else next();
}

async function handlePostReel(postID, value) {
    const sql = "UPDATE posts SET view_count = view_count + ? WHERE post_id = ?";
    conn.query(sql, [value, postID], (err, result) => {

    });
}

exports.viewcreate = viewcreate; 