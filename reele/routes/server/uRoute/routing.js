// Könyvtár importálása az adminisztrációhoz
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

// Felhasználói kérések kezelésére szolgáló útvonalak
router.post('/signup', valid.validation, exist.existchk, userForm.regU, cookie.cookieSet); // Regisztráció
router.post('/ich', auth.verifyToken, icHandler.iconHandle, cookie.cookieSet); // Ikon kezelése
router.post('/pch', auth.verifyToken, passHandler.pCH); // Jelszó módosítása
router.post('/des', auth.verifyToken, chkCharacter.charaterChk255, descUp.upDes); // Leírás frissítése
router.post('/login', admin.chkA, valid.validation, userForm.signU, cookie.cookieSet); // Bejelentkezés
router.get('/logout', killuser.killuser); // Kijelentkezés

module.exports = router;
