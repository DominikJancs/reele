const mysql = require("mysql2");
const setup = require("../setup");

var conn = mysql.createConnection(setup.database),
    genreList = [],
    genreLib = {};

conn.connect(function (err) {
    if (err) throw err; 
});

async function genreChk(req, res, next) {
    const genresCurr = req.body.genres; 
    let genreChk = false; 

    const getgenre = getGenres(req);
    genreList = (await getgenre).genre; 
    genreLib = (await getgenre).genre_lib; 

    if (genreList.length < 2) genreChk = true;

    genresCurr.forEach(genre => {
        if (!genreList.includes(genre)) genreChk = true; 
    });

    if (genreChk) {
        res.status(500).json({ msg: "Something went wrong!" }); 
    } else {
        req.genreLib = genreLib; 
        next(); 
    }
}

async function getGenres(req) {
    const sql = "SELECT * FROM genre_lib"; 
    const genres = []; 

    const result = await new Promise((resolve) => {
        conn.query(sql, [req.body.clubname], (err, res) => {
            resolve(res); 
        });
    });

    result.forEach(genre => {
        genres.push(genre.genre); 
    });

    return { genre_lib: result, genre: genres }; 
}

exports.genreChk = genreChk;