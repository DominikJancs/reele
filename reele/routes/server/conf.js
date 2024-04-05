const cors = require('cors'); // Cors modul importálása a Cross-Origin Resource Sharing beállításaihoz
const pth = require('path'); // Path modul importálása a fájl eléréséhez
const resources = pth.join(__dirname,'frontend'); // A frontend könyvtár elérési útjának meghatározása
const adminPauth = require('./authing/adminPauth'); // Admin hitelesítési modul importálása
const auth = require('./authing/auth'); // Felhasználó hitelesítési modul importálása
const pauth = require('./authing/pauth'); // Felhasználó hitelesítési modul importálása
const clubAuth = require('./authing/clubauth'); // Klub hitelesítési modul importálása
const clubPauth = require('./authing/clubPauth'); // Klub hitelesítési modul importálása
const reeleAuth = require('./authing/reeleAuth'); // Reele hitelesítési modul importálása
const getClubProfile = require('./authing/getclubProfile'); // Klub profil lekérés modul importálása
const getPostCover = require('./authing/getPost'); // Poszt borítókép lekérés modul importálása
const getPostFile = require('./authing/getFile'); // Poszt fájl lekérés modul importálása
const getUser = require('./authing/getUser'); // Felhasználó lekérés modul importálása
const getReel = require('./authing/getReel'); // Reele lekérés modul importálása
const getFlag = require('./authing/getFlag'); // Flag lekérés modul importálása
const getBookMark = require('./authing/getBookmark'); // Jegyzék lekérés modul importálása
const getAuthor = require('./authing/getAuthor'); // Szerző lekérés modul importálása
const getClub = require('./authing/getClub'); // Klub lekérés modul importálása
const profile = require('./authing/getProfile'); // Profil lekérés modul importálása
const view = require('./postRoute/view') // Poszt megjelenítés modul importálása
const setup = require('./setup'); // Beállítások modul importálása
const hbs = require('hbs'); // Handlebars modul importálása a nézetképzéshez
const fs = require('fs'); // Fájlrendszer modul importálása
const bodyParser = require('body-parser'); // Body parser modul importálása a HTTP kérés feldolgozásához
const cookieParser = require('cookie-parser'); // Cookie parser modul importálása a cookie-k feldolgozásához
var express = require('express'); // Express modul importálása a webszerver felállításához
var appl = express(); // Express alkalmazás létrehozása
appl.use(cors({ // Cors beállítása
    origin: [`http://192.168.0.143:${setup.port}`], // Engedélyezett eredeti címek
    methods: ["GET", "POST"],  // Engedélyezett kérésmódszerek
    credentials: true // Az azonosítási adatok (pl. cookie-k) engedélyezése a CORS kérésekben
}));
appl.use(cookieParser()); // Cookie parser beállítása
appl.use(bodyParser.urlencoded({ extended: true })); // Body parser beállítása URL-kódolt adatokhoz
appl.use(express.json()); // Express JSON parser beállítása
appl.use(require('../router/routing')); // Routing beállítása
appl.use(express.static(resources)); // Statisztikus fájlok elérhetőségének beállítása
appl.set('view engine', 'hbs'); // Handlebars beállítása nézetképzéshez

// Felhasználói backend erőforrások
appl.use('/api', require("./aRoute/routing")); // Admin routing
appl.use('/api', require("./uRoute/routing")); // Felhasználó routing
appl.use('/api', require("./cRoute/routing")); // Klub routing
appl.use('/api', require("./postRoute/routing")); // Poszt routing
appl.use('/api', require("./tRoute/routing")); // Reele routing

// Kezdőlap
appl.get('/', pauth.verifyToken, (req, res) => {
    res.render(`${resources}/h/home`, {data: req.user, exist: req.exist}); // Kezdőlap megjelenítése
});

// Admin oldal
appl.get('/a/:admin', adminPauth.verifyAdmin, (req, res) => {
    res.render(`${resources}/a/admin`, {data: req.admin}); // Admin oldal megjelenítése
});

// Poszt borítókép
appl.get('/posts/cover/:post', getPostCover.getCover, (req, res) => {
    res.sendFile(pth.join(__dirname, req.cover)); // Poszt borítóképének elérése
});

// Poszt fájl
appl.get('/posts/file/:post', getPostFile.getFile, (req, res) => {
    res.sendFile(pth.join(__dirname, req.document)); // Poszt fájljának elérése
});

// Bookmark
appl.get('/posts/bookmark/:post', pauth.verifyToken, getBookMark.getBookMark, (req, res) => {
    res.status(201).json(req.bookmark); // Bookmark lekérdezése
});

// Profilkép
appl.get('/users/profilepicture/:user', getUser.getUser, (req, res) => {
    res.sendFile(pth.join(__dirname, req.user)); // Profilkép lekérdezése
});

// Profilkép
appl.get('/u/profiles/picture/:user', profile.getAccessPcs, (req, res) => {
    res.sendFile(pth.join(__dirname, req.user.src)); // Profilkép lekérdezése
});

// Posztolás
appl.get('/post/:club', auth.verifyToken, clubAuth.clubAuth, (req, res) => {
    res.render(`${resources}/post/post-form.hbs`, {data: req.club}); // Posztolás megjelenítése
});

// Reelezés
appl.get('/reele/:post', pauth.verifyToken, reeleAuth.reeleAuth, getReel.chkreel, getFlag.chkflag, view.viewcreate, getClub.getClub, getAuthor.getAuthor, (req, res) => {
    res.render(`${resources}/post/post-view.hbs`, {reeleData: req.reele, data: req.user, exist: req.exist, reele: req.src, flag: req.flagSRC, club: req.clubP, author: req.authorP}); // Reelezés megjelenítése
});

// Klub profil
appl.get('/c/clubprofiles/picture/:club', getClubProfile.clubAuthProfile, (req, res) => {
    res.sendFile(pth.join(__dirname, req.club.clubprofile)); // Klub profiljának lekérdezése
});

// Klub borítókép elérése
appl.get('/c/clubbanners/picture/:club', getClubProfile.clubAuthProfile, (req, res) => {
    res.sendFile(pth.join(__dirname, req.club.clubbanner)); // Klub borítóképének lekérdezése
});

// Klub lap elérése
appl.get('/club/:club', pauth.verifyToken, clubPauth.clubPauth, (req, res) => {
    res.render(`${resources}/c/clubViewer.hbs`, {clubData: req.club, data: req.user, exist: req.exist}); // Klub lap megjelenítése
});

// Profil megtekintése
appl.get('/profile', auth.verifyToken, (req, res) => {
    res.render(`${resources}/p/viewProfil.hbs`, {data: req.user}); // Profil megtekintése
});

// Klub létrehozása
appl.get('/create-club', auth.verifyToken, (req,res) => {
    res.render(`${resources}/c/clubmaker.hbs`, {data: req.user}); // Klub létrehozása
});

// Felhasználó regisztrálása
appl.get('/u/signup',(req,res) => {
    res.render(`${resources}/u/user-form`, {method: true}); // Felhasználó regisztrálása
});

// Felhasználó bejelentkezése
appl.get('/u/login',(req,res) => {
    res.render(`${resources}/u/user-form`, {method: false}); // Felhasználó bejelentkezése
});

module.exports = appl; // Express alkalmazás exportálása
