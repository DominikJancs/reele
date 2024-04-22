const admin = require('./admin');
const auth = require('../authing/auth');
const icHandler = require('./icHandler');
const passHandler = require('./passHandler');
const chkCharacter = require('./chkCharacters');
const userForm = require('./userForm');
const exist = require('./existcheck');
const descUp = require('./descriptionUp');
const valid = require('./validate');
const killuser = require('./killuser');
const cookie = require('./cookieHandler');
const router = require('express').Router();

router.post('/signup', valid.validation, exist.existchk, userForm.regU, cookie.cookieSet); 
router.post('/ich', auth.verifyToken, icHandler.iconHandle, cookie.cookieSet); 
router.post('/pch', auth.verifyToken, passHandler.pCH); 
router.post('/des', auth.verifyToken, chkCharacter.charaterChk255, descUp.upDes); 
router.post('/login', admin.chkA, valid.validation, userForm.signU, cookie.cookieSet); 
router.get('/logout', killuser.killuser); 

module.exports = router;