'use strict';

var util = require('util');
var FileWalker = require('./file-walker');
var FileNode = require('./file-node');

FileWalker(new FileNode(__dirname), function(err, rootFileNode) {
  console.log(util.inspect(rootFileNode, {showHidden: false, depth:null}));
});
