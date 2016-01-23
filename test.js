'use strict';

var FileWalker = require('./file-walker');
var FileNode = require('./file-node');

FileWalker(new FileNode(__dirname), function(err, rootFileNode) {
  console.log(require('util').inspect(rootFileNode, {showHidden: false, depth:null}));
});
