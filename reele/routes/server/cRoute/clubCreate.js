// Szükséges modulok importálása
const mysql = require("mysql2");
const setup = require("../setup");

// Klub létrehozása
async function createClub(req, res) {
    try {
        // Adatbázis kapcsolat létrehozása
        var conn = mysql.createConnection(setup.database);

        // Adatbázis kapcsolat ellenőrzése
        conn.connect(function (err) {
            if (err) throw err; // Hiba esetén dob egy hibát
        });

        // Klub létrehozása az adatbázisban
        const comm = 'INSERT INTO clubs(club_name, club_admin, c_description) VALUES (?,?,?)';
        conn.query(comm, [req.body.clubname, req.user.userid, req.body.clubdesc], (err, result) => {
            if (err) throw err; // Hiba esetén dob egy hibát
            else {
                var clubid = result.insertId; // Létrehozott klub azonosítója

                // Librák létrehozása és hozzárendelése a klubhoz
                const commsl = 'SELECT * FROM libra_lib WHERE libra = ? LIMIT 1';
                const commsli = 'INSERT INTO libra_lib(libra) VALUES (?)';
                const comml = 'INSERT INTO libra_log(club_id, libra_id) VALUES (?,?)';
                req.body.libras.forEach(libra => {
                    var libra_id = "";
                    conn.query(commsl, [libra.toLowerCase()], async (err, res) => {
                        if (res.length > 0) {
                            libra_id = res[0].libra_id;
                        }
                        else {
                            libra_id = await createLibra(conn, commsli, libra.toLowerCase()); // Libra létrehozása, ha még nem létezik
                        }
                        conn.query(comml, [clubid, libra_id], (err, res) => {
                            if (err) throw err; // Hiba esetén dob egy hibát
                        });
                    });
                });

                // Műfajok hozzárendelése a klubhoz
                const commg = 'INSERT INTO genre_log(club_id, genre_id) VALUES (?,?)';
                req.body.genres.forEach(genre => {
                    req.genreLib.forEach(genrelib => {
                        if (genre == genrelib.genre) {
                            conn.query(commg, [clubid, genrelib.genre_id], (err, res) => {
                                if (err) throw err; // Hiba esetén dob egy hibát
                            });
                        }
                    });
                });

                // Sikeres létrehozás üzenet küldése
                res.status(201).json({ msg: "Succesfully created!" });
            }
        });
    }
    catch (error) {
        // Hiba esetén hibaüzenet küldése
        res.status(500).json({ msg: "Something went wrong!" });
    }
}

// Libra létrehozása
async function createLibra(conn, comm, dLibra) {
    const result = await new Promise((resolve) => {
        conn.query(comm, [dLibra], (err, res) => {
            resolve(res.insertId); // Létrehozott libra azonosítója
        });
    })
    return result;
}

// Függvény exportálása
exports.createClub = createClub;
