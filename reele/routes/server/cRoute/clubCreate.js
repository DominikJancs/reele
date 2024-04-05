const mysql = require("mysql2");
const setup = require("../setup");

async function createClub(req, res) {
    try {
        //Create con with the DB
        var conn = mysql.createConnection(setup.database);
        conn.connect(function (err) {
            if (err) throw err;
        });

        const comm = 'INSERT INTO clubs(club_name, club_admin, c_description) values(?,?,?)';
        conn.query(comm, [req.body.clubname, req.user.userid, req.body.clubdesc], (err, result) => {
            if (err) throw err;
            else {
                var clubid = result.insertId;
                const commsl = 'SELECT * FROM libra_lib WHERE libra = ? LIMIT 1',
                    commsli = 'INSERT INTO libra_lib(libra) values(?)',
                    comml = 'INSERT INTO libra_log(club_id, libra_id) values(?,?)',
                    commg = 'INSERT INTO genre_log(club_id, genre_id) values(?,?)';

                req.body.libras.forEach(libra => {
                    var libra_id = "";
                    conn.query(commsl, [libra.toLowerCase()], async (err, res) => {
                        if (res.length > 0) {
                            libra_id = res[0].libra_id;
                        }
                        else {
                            libra_id = await createLibra(conn, commsli, libra.toLowerCase());
                        }
                        conn.query(comml, [clubid, libra_id], (err, res) => {
                            if (err);
                        });
                    });
                });

                req.body.genres.forEach(genre => {
                    req.genreLib.forEach(genrelib => {
                        if (genre == genrelib.genre) {
                            conn.query(commg, [clubid, genrelib.genre_id], (err, res) => {
                                if (err);
                            });
                        }
                    });
                });

                res.status(201).json({ msg: "Succesfully created!" });
            }
        });
    }
    catch (error) {
        res.status(500).json({ msg: "Something went wrong!" });
    }
}

async function createLibra(conn, comm, dLibra) {
    const result = await new Promise((resolve) => {
        conn.query(comm, [dLibra], (err, res) => {
            resolve(res.insertId)
        });
    })
    return result;
}

exports.createClub = createClub;