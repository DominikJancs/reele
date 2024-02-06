const auth = require('../authing/auth');
const icHandler = require('./icHandler');
const passHandler = require('./passHandler');
const userForm = require('./userForm');
const exist = require('./existcheck');
const valid = require('./validate');
const killuser = require('./killuser');
const cookie = require('./cookieHandler');
const router = require('express').Router();

//Route to user req manage
router.post('/signup' ,valid.validation ,exist.existchk ,userForm.regU ,cookie.cookieSet);
router.post('/ich' ,auth.verifyToken ,icHandler.iconHandle ,cookie.cookieSet);
router.post('/pch' ,auth.verifyToken ,passHandler.pCH);
router.post('/login' ,valid.validation ,userForm.signU ,cookie.cookieSet);
router.get('/logout' ,killuser.killuser);

module.exports = router;