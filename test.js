'use strict';

var fileWalker = require('./file-walker');

fileWalker({rootPath: __dirname}, function(err, rootNode) {
  console.log(require('util').inspect(rootNode, {showHidden: false, depth:null}));
});
