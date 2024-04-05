const killadmin = require('./killadmin');
const admin = require('../authing/adminAuth');
const getFlagedClubs = require('./getFlagedClubs');
const getFlagedPosts = require('./getFlagedPosts');
const chkFlagedPosts = require('./deleteFlags');
const deletePost = require('./deletePost');
const router = require('express').Router();

//Route to club req manage
router.get('/exit' , killadmin.killa); // Útvonal az admin kijelentkezéséhez
router.get('/flaged/clubs', admin.verifyAdmin, getFlagedClubs.getFlagedClubs); // Útvonal a flagged klubok lekérdezéséhez (Admin azonosítást igényel)
router.get('/flaged/posts/:clubID', admin.verifyAdmin, getFlagedPosts.getFlagedPosts); // Útvonal a flagged bejegyzések lekérdezéséhez (Admin azonosítást igényel)
router.post('/flaged/check/:postID', admin.verifyAdmin, chkFlagedPosts.checkFlagedPosts); // Útvonal a flagged bejegyzések ellenőrzéséhez (Admin azonosítást igényel)
router.post('/flaged/delete/:postID', admin.verifyAdmin, deletePost.deleteFlagedPosts); // Útvonal a bejegyzések törléséhez (Admin azonosítást igényel)

module.exports = router;