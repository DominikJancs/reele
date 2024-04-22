const killadmin = require('./killadmin');
const admin = require('../authing/adminAuth');
const getFlagedClubs = require('./getFlagedClubs');
const getFlagedPosts = require('./getFlagedPosts');
const chkFlagedPosts = require('./deleteFlags');
const deletePost = require('./deletePost');
const router = require('express').Router();

router.get('/exit' , killadmin.killa); 
router.get('/flaged/clubs', admin.verifyAdmin, getFlagedClubs.getFlagedClubs); 
router.get('/flaged/posts/:clubID', admin.verifyAdmin, getFlagedPosts.getFlagedPosts); 
router.post('/flaged/check/:postID', admin.verifyAdmin, chkFlagedPosts.checkFlagedPosts); 
router.post('/flaged/delete/:postID', admin.verifyAdmin, deletePost.deleteFlagedPosts); 

module.exports = router;