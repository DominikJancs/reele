const mysql = require("mysql2");

const setup = require("../setup");

var conn = mysql.createConnection(setup.database);

conn.connect(function (err) {
    if (err) throw err;
});

async function vote(req, res) {

    let voteValue = parseInt(req.body.vote),
        voteState = null;

    const userID = req.user.userid,
        thoughtID = req.body.thought;

    if (voteValue == -1 || voteValue == 1) {

        const sql = "SELECT * FROM vote_log WHERE user_id = ? AND thought_id = ? LIMIT 1";
        const result = await new Promise((resolve) => {
            conn.query(sql, [userID, thoughtID], (err, res) => {
                resolve(res)
            });
        });

        if (result) {

            if (result.length > 0) {

                if (result[0].vote_value == voteValue) {
                    voteValue *= -1; 

                    const del = 'DELETE FROM vote_log WHERE user_id = ? AND thought_id = ?';
                    conn.query(del, [userID, thoughtID], (err, result) => {
                        if (err) throw err;
                    });
                    voteState = "deactive"; 
                }
                else {

                    const sql = "UPDATE vote_log SET vote_value = ? WHERE thought_id = ? AND user_id = ?";
                    conn.query(sql, [voteValue, thoughtID, userID], (err, result) => {
                        if (err) {
                            res.status(500).json({ msg: "Something went wrong !" });
                        }
                    });
                    voteValue *= 2; 
                    voteState = "active"; 
                }
            }
            else {

                const comm = 'INSERT INTO vote_log(user_id, thought_id, vote_value) values(?,?,?)';
                conn.query(comm, [userID, thoughtID, voteValue], async (err, result) => {
                    if (err) {
                        res.status(500).json({ msg: "Something went wrong !" });
                    }
                });
                voteState = "active"; 
            }

            const sql = "UPDATE thoughts SET vote_index = vote_index + ? WHERE thought_id = ?";
            conn.query(sql, [voteValue, thoughtID], (err, result) => {
                if (err) {
                    res.status(500).json({ msg: "Something went wrong !" });
                }
            });

            res.status(201).json({ vote_code: voteValue, vote_msg: voteState });
        }
        else res.status(500).json({ msg: "Something went wrong!" }); 
    }
    else res.status(500).json({ msg: "Something went wrong!" }); 
}

exports.vote = vote;