'use strict';

var util = require('util');
var fileWalker = require('./file-walker');

fileWalker({rootPath: __dirname}, function(err, rootNode) {
  console.log(util.inspect(rootNode, {showHidden: false, depth: null}));
});
