const cors = require('cors');
const pth = require('path');
const resources = pth.join(__dirname,'frontend');
const adminPauth = require('./authing/adminPauth');
const auth = require('./authing/auth');
const pauth = require('./authing/pauth');
const clubAuth = require('./authing/clubauth');
const clubPauth = require('./authing/clubPauth');
const reeleAuth = require('./authing/reeleAuth');
const getClubProfile = require('./authing/getclubProfile');
const getPostCover = require('./authing/getPost');
const getPostFile = require('./authing/getFile');
const getUser = require('./authing/getUser');
const getReel = require('./authing/getReel');
const getFlag = require('./authing/getFlag');
const getBookMark = require('./authing/getBookmark');
const getAuthor = require('./authing/getAuthor');
const getClub = require('./authing/getClub');
const profile = require('./authing/getProfile');
const view = require('./postRoute/view')
const setup = require('./setup');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var express = require('express');
var appl = express();
appl.use(cors({
    origin: [`http://192.168.0.143:${setup.port}`],
    methods: ["GET", "POST"], 
    credentials: true
}));
appl.use(cookieParser());
appl.use(bodyParser.urlencoded({ extended: true }));
appl.use(express.json());
appl.use(require('../router/routing'));
appl.use(express.static(resources));
appl.set('view engine', 'hbs');

//user backend resources
appl.use('/api', require("./aRoute/routing"));
appl.use('/api', require("./uRoute/routing"));
appl.use('/api', require("./cRoute/routing"));
appl.use('/api', require("./postRoute/routing"));
appl.use('/api', require("./tRoute/routing"));
// ==--==

//Kezdőlap
appl.get('/', pauth.verifyToken, (req, res) => {
    res.render(`${resources}/h/home`, {data: req.user, exist: req.exist});
});

//Admin oldal
appl.get('/a/:admin', adminPauth.verifyAdmin, (req, res) => {
    res.render(`${resources}/a/admin`, {data: req.admin});
});

//poszt boritókép  
appl.get('/posts/cover/:post', getPostCover.getCover, (req, res) => {
    res.sendFile(pth.join(__dirname, req.cover));
});

//poszt fájl 
appl.get('/posts/file/:post', getPostFile.getFile, (req, res) => {
    res.sendFile(pth.join(__dirname, req.document));
});

//bookmark
appl.get('/posts/bookmark/:post', pauth.verifyToken, getBookMark.getBookMark, (req, res) => {
    res.status(201).json(req.bookmark);
});

//Profilkép
appl.get('/users/profilepicture/:user', getUser.getUser, (req, res) => {
    res.sendFile(pth.join(__dirname, req.user));
});

//Profilkép
appl.get('/u/profiles/picture/:user', profile.getAccessPcs, (req, res) => {
    res.sendFile(pth.join(__dirname, req.user.src));
});

//Posztolás
appl.get('/post/:club', auth.verifyToken, clubAuth.clubAuth, (req, res) => {
    res.render(`${resources}/post/post-form.hbs`, {data: req.club});
});

//Reelezés
appl.get('/reele/:post', pauth.verifyToken, reeleAuth.reeleAuth, getReel.chkreel, getFlag.chkflag, view.viewcreate, getClub.getClub, getAuthor.getAuthor, (req, res) => {
    res.render(`${resources}/post/post-view.hbs`, {reeleData: req.reele, data: req.user, exist: req.exist, reele: req.src, flag: req.flagSRC, club: req.clubP, author: req.authorP});
});

//Klub profil
appl.get('/c/clubprofiles/picture/:club', getClubProfile.clubAuthProfile, (req, res) => {
    res.sendFile(pth.join(__dirname, req.club.clubprofile));
});

//Club boritókép elérése
appl.get('/c/clubbanners/picture/:club', getClubProfile.clubAuthProfile, (req, res) => {
    res.sendFile(pth.join(__dirname, req.club.clubbanner));
});

//Klub lap elérése
appl.get('/club/:club', pauth.verifyToken, clubPauth.clubPauth, (req, res) => {
    res.render(`${resources}/c/clubViewer.hbs`, {clubData: req.club, data: req.user, exist: req.exist});
});

//Profil megtekintése
appl.get('/profile', auth.verifyToken, (req, res) => {
    res.render(`${resources}/p/viewProfil.hbs`, {data: req.user});
});

//Club létrehozása
appl.get('/create-club', auth.verifyToken, (req,res) => {
    res.render(`${resources}/c/clubmaker.hbs`, {data: req.user});
});

//Felhasználó regisztrálás
appl.get('/u/signup',(req,res) => {
    res.render(`${resources}/u/user-form`, {method: true});
});

//Felhasználó bejelentkezés
appl.get('/u/login',(req,res) => {
    res.render(`${resources}/u/user-form`, {method: false});
});

module.exports = appl;