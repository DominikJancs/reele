const auth = require('../authing/auth'); // Felhasználó hitelesítés modul importálása
const clubAuth = require('../authing/clubauth'); // Klub hitelesítés modul importálása
const upClubIc = require('./upClubIC'); // Klub ikon feltöltés modul importálása
const upClubBanner = require('./upClubBanner'); // Klub borítókép feltöltés modul importálása
const chkCharacter = require('./chkCharacters'); // Karakter ellenőrzés modul importálása
const createClub = require('./clubCreate'); // Klub létrehozás modul importálása
const createPost = require('./postCreate'); // Poszt létrehozás modul importálása
const exist = require('./existcheck'); // Létezés ellenőrzés modul importálása
const genreChk = require('./genrecheck'); // Műfaj ellenőrzés modul importálása
const getgenres = require('./getGenres'); // Műfajok lekérdezése modul importálása
const userChk = require('./userChk'); // Felhasználó ellenőrzés modul importálása
const joinChk = require('./joinChk'); // Csatlakozás ellenőrzés modul importálása
const joinCreate = require('./joinCreate'); // Csatlakozás létrehozás modul importálása
const getJoin = require('./getJoined'); // Csatlakozások lekérdezése modul importálása
const getTop5 = require('./getTop5'); // Top 5 lekérdezése modul importálása
const finalizer = require('./finalizer'); // Véglegesítő modul importálása
const router = require('express').Router(); // Express Router importálása

// Klub műfajok lekérdezése útvonal
router.get('/clubgenres/:club' ,auth.verifyToken , userChk.userchk, getgenres.getgenre);
// Csatlakozás ellenőrzése útvonal
router.get('/club/join-get/:club' ,auth.verifyToken , userChk.userchk, joinChk.joinchk);
// Csatlakozások lekérdezése útvonal
router.get('/joined', auth.verifyToken , getJoin.getjoin);
// Top 5 lekérdezése útvonal
router.get('/top5', getTop5.gettop5);

// Poszt létrehozás útvonal
router.post('/create-club' ,auth.verifyToken , userChk.userchk, chkCharacter.charaterChk255, exist.existchk, genreChk.genreChk, chkCharacter.LcharaterChk3to6, createClub.createClub);
// Klub ikon feltöltés útvonal
router.post('/upclubic' ,auth.verifyToken , upClubIc.clubIcUp, finalizer.finalizer);
// Klub borítókép feltöltés útvonal
router.post('/upclubbanner' ,auth.verifyToken , upClubBanner.clubBannerUp, finalizer.finalizer);
// Poszt létrehozás útvonal
router.post('/club/new-post/:club' ,auth.verifyToken , userChk.userchk, clubAuth.clubAuth, createPost.postCreate, finalizer.finalizer);
// Csatlakozás létrehozás útvonal
router.post('/club/join/:club' ,auth.verifyToken , userChk.userchk, joinCreate.joincreate);

module.exports = router; // Router exportálása
