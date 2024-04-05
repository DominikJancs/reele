// Importáljuk a szükséges MySQL csomagot
const mysql = require("mysql2");

// Importáljuk a beállításokat, hogy kapcsolódhassunk az adatbázishoz
const setup = require("../setup");

// Importáljuk a dátumformátumot
const dateFormat = require("./dateFormat");

// Létrehozunk egy kapcsolatot az adatbázissal
var conn = mysql.createConnection(setup.database);

// Kapcsolódunk az adatbázishoz
conn.connect(function (err) {
    if (err) throw err;
});

// Az aszinkron funkció, amely lekéri a gondolatokat a bejegyzéshez
async function getthought(req, res) {
    // A bejegyzés azonosítója, amelyhez a gondolatok tartoznak
    var post_id = req.postID;

    // SQL lekérdezés összeállítása a gondolatok lekérdezéséhez
    const sql = "SELECT thought_id AS thought, user_id, create_time AS thoughted, context AS text, vote_index AS votes, t_page_pin AS pageIndex FROM thoughts WHERE post_id = ? ORDER BY vote_index DESC, create_time DESC;";

    // Az SQL lekérdezés aszinkron végrehajtása
    const result = await new Promise((resolve) => {
        conn.query(sql, [post_id], (err, res) => {
            console.log(err) // Hibajelzés konzolra
            resolve(res)
        });
    });

    // Ha van eredmény
    if (result) {
        if (result.length > 0) {
            // Létrehozzuk a gondolatokat
            var thoughtresult = await createthought(req, res, result);
            res.status(201).json(thoughtresult); // Válasz elküldése
        }
        else {
            // Ha nincs eredmény, hibát küldünk vissza
            res.status(404).send("Something went wrong! 0").json();
        }
    }
    else {
        // Ha nincs eredmény, hibát küldünk vissza
        res.status(404).send("Something went wrong! 1").json();
    }
}

// Az aszinkron funkció, amely létrehozza a gondolatokat
async function createthought(req, res, thoughts) {
    var thoughtsData = [];

    // Végigmegyünk a gondolatokon
    for (let i = 0; i < thoughts.length; i++) {
        var userid = thoughts[i].user_id;

        // SQL lekérdezés összeállítása a felhasználó adatainak lekérdezéséhez
        const sql = "SELECT * FROM users WHERE user_id = ? LIMIT 1";

        // Az SQL lekérdezés aszinkron végrehajtása
        const result = await new Promise((resolve) => {
            conn.query(sql, [userid], (err, res) => {
                resolve(res)
            });
        });

        // Ha van eredmény
        if (result) {
            if (result.length > 0) {
                var vote = null

                // A felhasználó adatainak beállítása
                thoughts[i].username = result[0].user_name;
                thoughts[i].userprofile = result[0].u_icon_path;
                if (result[0].u_description == null) thoughts[i].description = "";
                else thoughts[i].description = result[0].u_description;
                if (req.exist) vote = await getVote(thoughts[i].thought, req.user.userid);
                else vote = 0;
                thoughts[i].vote = vote;
                delete thoughts[i].user_id;

                // Gondolat hozzáadása a gondolatok listájához
                thoughtsData.push(thoughts[i]);
            }
            else {
                // Ha nincs eredmény, hibát küldünk vissza
                res.status(404).send("Something went wrong 2!").json();
            }
        }
        else {
            // Ha nincs eredmény, hibát küldünk vissza
            res.status(404).send("Something went wrong! 3").json();
        }
    }
    return thoughtsData;
}

// Az aszinkron funkció, amely lekéri a felhasználó által adott szavazatot
async function getVote(thoughtID, userID) {
    // SQL lekérdezés összeállítása a szavazat lekérdezéséhez
    const sql = "SELECT vote_value FROM vote_log WHERE user_id = ? AND thought_id = ? LIMIT 1";

    // Az SQL lekérdezés aszinkron végrehajtása
    const result = await new Promise((resolve) => {
        conn.query(sql, [userID, thoughtID], (err, res) => {
            resolve(res)
        });
    });

    // Ha van eredmény
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

// Az exporthoz rendeljük a getthought függvényt
exports.getthought = getthought;
