const httpS = require('http');
const fs = require('fs');
const setup = require('./setup.js');
const appl = require('./conf.js');

//Start server on the defined PORT
appl.listen(setup.port);