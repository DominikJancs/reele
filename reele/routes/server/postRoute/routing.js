// Könyvtár importálása az autentikációhoz
const auth = require('../authing/auth');
const pauth = require('../authing/pauth');
const post_get = require('./getPOST');
const reel = require('./reel');
const flag = require('./flag');
const yourreel = require('./yourReel');
const bookmark = require('./bookmark');
const router = require('express').Router();

// Útvonal a bejegyzések kezeléséhez
router.get('/posts/:club/:filter', pauth.verifyToken, post_get.getpost); // Bejegyzések lekérése egy klubhoz
router.get('/yourreel/:club', auth.verifyToken, yourreel.yourreel); // Saját tekercs lekérése
router.post('/posts/reele/:post', auth.verifyToken, reel.reelecreate); // Bejegyzés Reelelés
router.post('/posts/flag/:post', auth.verifyToken, flag.flaging); // Bejegyzés jelzése
router.post('/posts/bookmark/:post', auth.verifyToken, bookmark.createbookmark); // Bejegyzés könyvjelzőzése

module.exports = router;
