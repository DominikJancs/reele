const mysql = require("mysql2");

const setup = require("../setup");

const dateFormat = require("./dateFormat");

var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function getthought(req, res) {

    var post_id = req.postID;

    const sql = "SELECT thought_id AS thought, user_id, create_time AS thoughted, context AS text, vote_index AS votes, t_page_pin AS pageIndex FROM thoughts WHERE post_id = ? ORDER BY vote_index DESC, create_time DESC;";

    const result = await new Promise((resolve) => {
        conn.query(sql, [post_id], (err, res) => {
            console.log(err) 
            resolve(res)
        });
    });

    if (result) {
        if (result.length > 0) {

            var thoughtresult = await createthought(req, res, result);
            res.status(201).json(thoughtresult); 
        }
        else {

            res.status(404).send("Something went wrong! 0").json();
        }
    }
    else {

        res.status(404).send("Something went wrong! 1").json();
    }
}

async function createthought(req, res, thoughts) {
    var thoughtsData = [];

    for (let i = 0; i < thoughts.length; i++) {
        var userid = thoughts[i].user_id;

        const sql = "SELECT * FROM users WHERE user_id = ? LIMIT 1";

        const result = await new Promise((resolve) => {
            conn.query(sql, [userid], (err, res) => {
                resolve(res)
            });
        });

        if (result) {
            if (result.length > 0) {
                var vote = null

                thoughts[i].username = result[0].user_name;
                thoughts[i].userprofile = result[0].u_icon_path;
                if (result[0].u_description == null) thoughts[i].description = "";
                else thoughts[i].description = result[0].u_description;
                if (req.exist) vote = await getVote(thoughts[i].thought, req.user.userid);
                else vote = 0;
                thoughts[i].vote = vote;
                delete thoughts[i].user_id;

                thoughtsData.push(thoughts[i]);
            }
            else {

                res.status(404).send("Something went wrong 2!").json();
            }
        }
        else {

            res.status(404).send("Something went wrong! 3").json();
        }
    }
    return thoughtsData;
}

async function getVote(thoughtID, userID) {

    const sql = "SELECT vote_value FROM vote_log WHERE user_id = ? AND thought_id = ? LIMIT 1";

    const result = await new Promise((resolve) => {
        conn.query(sql, [userID, thoughtID], (err, res) => {
            resolve(res)
        });
    });

    if (result) {
        if (result.length > 0) {
            return result[0].vote_value;
        }
        else {
            return 0;
        }
    }
    else {
        return 0;
    }
}

exports.getthought = getthought;