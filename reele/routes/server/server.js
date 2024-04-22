const httpS = require('http');
const fs = require('fs');
const setup = require('./setup.js');
const appl = require('./conf.js');

appl.listen(setup.port);

module.exports = appl;