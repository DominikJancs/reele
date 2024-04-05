// Szükséges modulok importálása
const mysql = require("mysql2"); // MySQL modul importálása
const setup = require("../setup"); // Beállítások importálása
var conn = mysql.createConnection(setup.database); // MySQL kapcsolat létrehozása

// MySQL adatbáziskapcsolat létrehozása
conn.connect(function (err) {
    if (err) throw err; // Hiba esetén hibaüzenet dobása
});

// Bejegyzések lekérése
async function getpost(req, res) {
    // Lehetséges műfajok és szűrők
    var possgenre = ['classic', 'action', 'comedy', 'crime', 'drama', 'sci-fi', 'western', 'teaching', 'nature'];
    var possfilter = ['new', 'old', 'reeled'];

    // Szűrők lekérése a kérésből
    var filter = req.params.filter;
    var club = req.params.club;

    // "home" klub esetén
    if (club == "home") {
        if (possgenre.includes(filter)) getAllByGenre(req, res, filter);
        else if (possfilter.includes(filter));
        else getAll(req, res);
    }
    // Egyéb klub esetén
    else {
        var clubID = await getClubID(club, res);
        if (possgenre.includes(filter)) getAllByGenreClub(req, res, filter, clubID);
        else if (possgenre.includes(possfilter));
        else getAllfromClub(req, res, clubID);
    }
}

// Bejegyzések lekérése műfaj alapján
async function getAllByGenre(req, res, genre) {
    var genreID = await chkGenres(conn, req, genre);
    console.log(genreID);
    if (genreID.value) {
        const sql = "SELECT author_name AS Authorname, post_title AS documentname, by_title AS byauthor, create_time AS sharetime FROM posts WHERE genre_id = ?";
        const result = await new Promise((resolve) => {
            conn.query(sql, [genreID.genreID], (err, res) => {
                resolve(res)
            });
        });
        if (result) {
            if (result.length > 0) {
                var postresult = await chkreel(req, result);
                res.status(201).json(postresult);
            }
            else res.status(404).send("Something went wrong!").json();
        }
        else res.status(404).send("Something went wrong!").json();
    }
}

// Bejegyzések lekérése műfaj és klub alapján
async function getAllByGenreClub(req, res, genre, clubid) {
    var genreID = await chkGenres(conn, req, genre);
    console.log(genreID);
    if (genreID.value) {
        const sql = "SELECT author_name AS Authorname, post_title AS documentname, by_title AS byauthor, create_time AS sharetime FROM posts WHERE genre_id = ? AND club_id = ?";
        const result = await new Promise((resolve) => {
            conn.query(sql, [genreID.genreID, clubid], (err, res) => {
                resolve(res)
            });
        });
        if (result) {
            if (result.length > 0) {
                var postresult = await chkreel(req, result);
                res.status(201).json(postresult);
            }
            else res.status(404).send("Something went wrong!").json();
        }
        else res.status(404).send("Something went wrong!").json();
    }
}

// Összes bejegyzés lekérése
async function getAll(req, res) {
    const sql = "SELECT author_name AS Authorname, post_title AS documentname, by_title AS byauthor, create_time AS sharetime FROM posts";
    const result = await new Promise((resolve) => {
        conn.query(sql, (err, res) => {
            resolve(res)
        });
    });
    if (result) {
        if (result.length > 0) {
            var postresult = await chkreel(req, result);
            res.status(201).json(postresult);
        }
        else res.status(404).send("Something went wrong!").json();
    }
    else res.status(404).send("Something went wrong!").json();
}

// Klub összes bejegyzésének lekérése
async function getAllfromClub(req, res, clubid) {
    const sql = "SELECT author_name AS Authorname, post_title AS documentname, by_title AS byauthor, create_time AS sharetime FROM posts WHERE club_id = ?";
    const result = await new Promise((resolve) => {
        conn.query(sql, [clubid], (err, res) => {
            resolve(res)
        });
    });
    if (result) {
        if (result.length > 0) {
            var postresult = await chkreel(req, result);
            res.status(201).json(postresult);
        }
        else res.status(404).send("Something went wrong!").json();
    }
    else res.status(404).send("Something went wrong!").json();
}

// Klub azonosítójának lekérése
async function getClubID(clubname, res) {
    const sql = "SELECT * FROM clubs WHERE club_name = ? LIMIT 1";
    const result = await new Promise((resolve) => {
        conn.query(sql, [clubname], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) {
        var club_id = result[0].club_id;
        return club_id;
    }
    return "";
}

// Műfaj ellenőrzése
async function chkGenres(conn, req, genre) {
    const suggGenre = genre,
        sql = "SELECT genre_id FROM genre_lib WHERE genre = ? LIMIT 1";

    const result = await new Promise((resolve) => {
        conn.query(sql, [suggGenre], (err, res) => {
            resolve(res)
        });
    });
    if (result.length > 0) {
        var genre_id = result[0].genre_id;
        return { value: true, genreID: genre_id };
    }
    else {
        return { value: false, genreID: "" };
    }
}

// Reel ellenőrzése
async function chkreel(req, posts) {
    let postData = [];

    for (let i = 0; i < posts.length; i++) {
        var posttitle = posts[i].documentname;

        const sql = "SELECT post_id FROM posts WHERE post_title = ? LIMIT 1";
        const result = await new Promise((resolve) => {
            conn.query(sql, [posttitle], (err, res) => {
                resolve(res)
            });
        });
        if (result && req.exist) {
            if (result.length > 0) {
                var post_id = result[0].post_id

                const sqlm = "SELECT * FROM reeles WHERE post_id = ? AND user_id = ? LIMIT 1";
                const result2 = await new Promise((resolve) => {
                    conn.query(sqlm, [post_id, req.user.userid], (err, res) => {
                        resolve(res)
                    });
                });
                if (result2) {
                    if (result2.length > 0) {
                        posts[i].reelIcon = "../assets/reele-icon-a.svg";
                        posts[i].reelMsg = "Reeled";
                    }
                    else {
                        posts[i].reelIcon = "../assets/unreeled.svg";
                        posts[i].reelMsg = "Reel it";
                    }
                }
                else {
                    posts[i].reelIcon = "../assets/unreeled.svg";
                    posts[i].reelMsg = "Reel it";
                }
            }
            else {
                posts[i].reelIcon = "../assets/unreeled.svg";
                posts[i].reelMsg = "Reel it";
            }
        }
        else {
            posts[i].reelIcon = "../assets/unreeled.svg";
            posts[i].reelMsg = "Reel it";
        }
        postData.push(posts[i]);
    }
    return postData;
}

// Exportálás
exports.getpost = getpost; // Bejegyzések lekérésének exportálása
exports.getClubID = getClubID; // Klub azonosítójának exportálása
