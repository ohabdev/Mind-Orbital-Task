
const path = require('path');
const nconf = require('nconf');

process.env.LOCAL_ID = Math.random().toString(36).substring(7);
process.env.APP_ROOT_DIR = path.join(__dirname, '..');

nconf.argv()
  .env()
  .file({ file: path.resolve(path.join(__dirname, 'config', `${process.env.NODE_ENV}.json`)) });
  
const Kernel = require('./kernel');

const kernel = new Kernel();

kernel.loadModule(require('./module/system'));
kernel.loadModule(require('./module/passport'));
kernel.loadModule(require('./module/user'));
kernel.loadModule(require('./module/shop'));

kernel.compose();

module.exports = kernel;