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

router.get('/clubgenres/:club' ,auth.verifyToken , userChk.userchk, getgenres.getgenre);

router.get('/club/join-get/:club' ,auth.verifyToken , userChk.userchk, joinChk.joinchk);

router.get('/joined', auth.verifyToken , getJoin.getjoin);

router.get('/top5', getTop5.gettop5);

router.post('/create-club' ,auth.verifyToken , userChk.userchk, chkCharacter.charaterChk255, exist.existchk, genreChk.genreChk, chkCharacter.LcharaterChk3to6, createClub.createClub);

router.post('/upclubic' ,auth.verifyToken , upClubIc.clubIcUp, finalizer.finalizer);

router.post('/upclubbanner' ,auth.verifyToken , upClubBanner.clubBannerUp, finalizer.finalizer);

router.post('/club/new-post/:club' ,auth.verifyToken , userChk.userchk, clubAuth.clubAuth, createPost.postCreate, finalizer.finalizer);

router.post('/club/join/:club' ,auth.verifyToken , userChk.userchk, joinCreate.joincreate);

module.exports = router; 