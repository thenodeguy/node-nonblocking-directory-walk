'use strict';

const util = require('util');
const fileWalker = require('./file-walker');

fileWalker({rootPath: __dirname}, function callback(err, rootNode) {
  console.log(util.inspect(rootNode, {showHidden: false, depth: null}));
});
