const auth = require('../authing/auth');
const pauth = require('../authing/pauth');
const post_get = require('./getPOST');
const reel = require('./reel');
const flag = require('./flag');
const yourreel = require('./yourReel');
const bookmark = require('./bookmark');
const router = require('express').Router();

router.get('/posts/:club/:filter', pauth.verifyToken, post_get.getpost); 
router.get('/yourreel/:club', auth.verifyToken, yourreel.yourreel); 
router.post('/posts/reele/:post', auth.verifyToken, reel.reelecreate); 
router.post('/posts/flag/:post', auth.verifyToken, flag.flaging); 
router.post('/posts/bookmark/:post', auth.verifyToken, bookmark.createbookmark); 

module.exports = router;