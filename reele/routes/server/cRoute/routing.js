// Könyvtár importálása az autentikációhoz
const auth = require('../authing/auth');
const clubAuth = require('../authing/clubauth');
const upClubIc = require('./upClubIC');
const upClubBanner = require('./upClubBanner');
const chkCharacter = require('./chkCharacters');
const createClub = require('./clubCreate');
const createPost = require('./postCreate');
const exist = require('./existcheck');
const genreChk = require('./genrecheck');
const getgenres = require('./getGenres');
const userChk = require('./userChk');
const joinChk = require('./joinChk');
const joinCreate = require('./joinCreate');
const getJoin = require('./getJoined');
const getTop5 = require('./getTop5');
const finalizer = require('./finalizer');
const router = require('express').Router();

// Útvonal a klub igények kezeléséhez
router.get('/clubgenres/:club', auth.verifyToken, userChk.userchk, getgenres.getgenre); // Klub műfajok lekérése
router.get('/club/join-get/:club', auth.verifyToken, userChk.userchk, joinChk.joinchk); // Csatlakozás ellenőrzése a klubhoz
router.get('/joined', auth.verifyToken, getJoin.getjoin); // Csatlakozott klubok lekérése
router.get('/top5', getTop5.gettop5); // Top 5 klub lekérése

// Bejegyzés útvonalak
router.post('/create-club', auth.verifyToken, userChk.userchk, chkCharacter.charaterChk255, exist.existchk, genreChk.genreChk, chkCharacter.LcharaterChk3to6, createClub.createClub); // Klub létrehozása
router.post('/upclubic', auth.verifyToken, upClubIc.clubIcUp, finalizer.finalizer); // Klub ikon frissítése
router.post('/upclubbanner', auth.verifyToken, upClubBanner.clubBannerUp, finalizer.finalizer); // Klub banner frissítése
router.post('/club/new-post/:club', auth.verifyToken, userChk.userchk, clubAuth.clubAuth, createPost.postCreate, finalizer.finalizer); // Új bejegyzés hozzáadása a klubhoz
router.post('/club/join/:club', auth.verifyToken, userChk.userchk, joinCreate.joincreate); // Csatlakozás egy klubhoz

module.exports = router;
