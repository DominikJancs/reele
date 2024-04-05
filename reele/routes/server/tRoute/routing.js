// Könyvtár importálása az autentikációhoz
const auth = require('../authing/auth');
const pauth = require('../authing/pauth');
const chkCharacter = require('./chkCharacters');
const createThought = require('./createThought');
const chkThought = require('./thoughtChk');
const getPost = require('./getPost');
const getThoughts = require('./getThoughts');
const vote = require('./vote');

const router = require('express').Router();

// Útvonal a felhasználó kérések kezeléséhez
router.post('/thought/:post', auth.verifyToken, getPost.getPost, createThought.createthought); // Gondolat létrehozása egy bejegyzéshez
router.get('/thoughts/:post', pauth.verifyToken, getPost.getPost, getThoughts.getthought); // Gondolatok lekérése egy bejegyzéshez
router.post('/thoughts/vote', auth.verifyToken, chkThought.thoughtchk, vote.vote); // Gondolat voteolás

module.exports = router;
