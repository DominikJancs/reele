const mysql = require("mysql2"); 
const setup = require("../setup"); 
var conn = mysql.createConnection(setup.database); 

conn.connect(function (err) {
    if (err) throw err; 
});

async function createbookmark(req, res) {
    var postTitle = req.params.post; 
    var page = req.body.page, 
        userid = req.user.userid; 

    const sql = "SELECT * FROM posts WHERE post_title = ? LIMIT 1"; 
    const result = await new Promise((resolve) => { 
        conn.query(sql, [postTitle], (err, res) => { 
            resolve(res)
        });
    });
    if (result.length > 0) { 
        const sqlm = "SELECT * FROM bookmarks WHERE user_id = ? AND post_id = ? AND b_page_pin = ? LIMIT 1"; 
        var post_id = result[0].post_id; 

        const result2 = await new Promise((resolve) => { 
            conn.query(sqlm, [userid, post_id, page], (err, res) => { 
                resolve(res)
            });
        });
        if (result2.length > 0) { 
            const del = 'DELETE FROM bookmarks WHERE user_id = ? AND post_id = ? AND b_page_pin = ?'; 
            conn.query(del, [userid, post_id, page], (err, result) => { 
                if (err) throw err; 
            });
            res.status(201).json({ class: "bookmark" }); 
        }
        else { 
            const comm = 'INSERT INTO bookmarks(user_id, post_id, b_page_pin) values(?,?,?)'; 
            conn.query(comm, [userid, post_id, page], (err, result) => { 
                if (err) throw err; 
            });
            res.status(201).json({ class: "bookmark marked" }); 
        }
    }
    else res.status(500).json({ msg: "Something went wrong!" }); 
}

exports.createbookmark = createbookmark; 