const cors = require('cors');
const pth = require('path');
const resources = pth.join(__dirname,'frontend');
const auth = require('./authing/auth');
const profile = require('./authing/getProfile');
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
appl.use(bodyParser.urlencoded({extended: true}))
appl.use(express.json());
appl.use(require('../router/routing'));
appl.use(express.static(resources));
appl.set('view engine', 'hbs');

//user backend resource
appl.use('/api', require("./uRoute/routing"));
//

//Entry page routing 
appl.get('/', auth.verifyToken, (req, res) => {
    res.render(`${resources}/h/home`, {data: req.user});
});

//Entry page routing 
appl.get('/u/profiles/picture/:user', profile.getAccessPcs, (req, res) => {
    res.sendFile(pth.join(__dirname, req.user.src));
});

//Profile page routing test
appl.get('/profile', auth.verifyToken, (req, res) => {
    res.render(`${resources}/p/viewProfil.hbs`, {data: req.user});
});

//user login page 
appl.get('/u',(req,res) => {
    res.render(`${resources}/u/user-form`);
});

module.exports = appl;