// Importáljuk a MySQL csomagot
const mysql = require("mysql2");

// Importáljuk a beállításokat
const setup = require("../setup");

// Létrehozunk egy kapcsolatot az adatbázissal
var conn = mysql.createConnection(setup.database);

// Kapcsolódunk az adatbázishoz
conn.connect(function (err) {
    if (err) throw err;
});

// Az aszinkron funkció, ami a szavazást végzi el
async function vote(req, res) {
    // A szavazat értékét és állapotát deklaráljuk
    let voteValue = parseInt(req.body.vote),
        voteState = null;

    // A felhasználó és a gondolat azonosítóit lekérdezzük
    const userID = req.user.userid,
        thoughtID = req.body.thought;

    // Ha a szavazat értéke -1 vagy 1
    if (voteValue == -1 || voteValue == 1) {
        // Ellenőrizzük, hogy a felhasználó már szavazott-e a gondolatra
        const sql = "SELECT * FROM vote_log WHERE user_id = ? AND thought_id = ? LIMIT 1";
        const result = await new Promise((resolve) => {
            conn.query(sql, [userID, thoughtID], (err, res) => {
                resolve(res)
            });
        });

        // Ha van eredmény
        if (result) {
            // Ha a felhasználó már szavazott
            if (result.length > 0) {
                // Ha a korábbi szavazat megegyezik az új szavazattal
                if (result[0].vote_value == voteValue) {
                    voteValue *= -1; // A szavazat értékét megváltoztatjuk az eltávolításhoz
                    // Töröljük a szavazatot a vote_log táblából
                    const del = 'DELETE FROM vote_log WHERE user_id = ? AND thought_id = ?';
                    conn.query(del, [userID, thoughtID], (err, result) => {
                        if (err) throw err;
                    });
                    voteState = "deactive"; // A szavazat állapotát "deactive"-re állítjuk
                }
                else {
                    // Frissítjük a szavazatot az új értékkel
                    const sql = "UPDATE vote_log SET vote_value = ? WHERE thought_id = ? AND user_id = ?";
                    conn.query(sql, [voteValue, thoughtID, userID], (err, result) => {
                        if (err) {
                            res.status(500).json({ msg: "Something went wrong !" });
                        }
                    });
                    voteValue *= 2; // A szavazat értékét megnöveljük 2-vel, mivel a szavazat megváltozott
                    voteState = "active"; // A szavazat állapotát "active"-re állítjuk
                }
            }
            else {
                // Beszúrjuk az új szavazatot a vote_log táblába
                const comm = 'INSERT INTO vote_log(user_id, thought_id, vote_value) values(?,?,?)';
                conn.query(comm, [userID, thoughtID, voteValue], async (err, result) => {
                    if (err) {
                        res.status(500).json({ msg: "Something went wrong !" });
                    }
                });
                voteState = "active"; // A szavazat állapotát "active"-re állítjuk
            }
            // Frissítjük a gondolat szavazatindexét
            const sql = "UPDATE thoughts SET vote_index = vote_index + ? WHERE thought_id = ?";
            conn.query(sql, [voteValue, thoughtID], (err, result) => {
                if (err) {
                    res.status(500).json({ msg: "Something went wrong !" });
                }
            });
            // Válaszként visszaküldjük a szavazat kódját és üzenetét
            res.status(201).json({ vote_code: voteValue, vote_msg: voteState });
        }
        else res.status(500).json({ msg: "Something went wrong!" }); // Ha valami hiba történt
    }
    else res.status(500).json({ msg: "Something went wrong!" }); // Ha a szavazat értéke nem megfelelő
}

// Az exporthoz rendeljük a vote függvényt
exports.vote = vote;
