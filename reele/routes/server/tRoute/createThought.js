const mysql = require("mysql2");
const setup = require("../setup");
const dateFormat = require("./dateFormat");
var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function createthought(req, res) {
    try {
        const comm = 'INSERT INTO thoughts(post_id, user_id, context, t_page_pin) values(?,?,?,?)';
        conn.query(comm, [req.postID, req.user.userid, req.body.thought, req.body.pages], async (err, result) => {
            var date = await dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
            if (err) {
                res.status(500).json({ msg: "Something went wrong 1!", page: "", thoughted: date });
            }
            else res.status(201).json({ msg: req.body.thought, page: req.body.pages, thoughted: date });
        });
    }
    catch (error) {
        res.status(201).json({ msg: "Something went wrong 2 !", page: "", thoughted: date });
    }
}

exports.createthought = createthought;