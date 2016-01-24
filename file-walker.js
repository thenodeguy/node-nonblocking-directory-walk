'use strict';

var fs = require('fs');
var path = require('path');
var events = require('events');
var FileNode = require('./file-node');

var rootNode;
var totalWalksInProgress;
var totalWalksComplete;
var eventEmitter;

// Module entry point.
module.exports = function(opt, callback) {
  var opt = opt || {};
  
  if(!opt.rootPath) {
    var err = new Error('No root node specified.');
    callback(err);
    return;
  }
  
  // Variable readiness
  rootNode = new FileNode(opt.rootPath);
  totalWalksInProgress = 0;
  totalWalksComplete = 0;
  
  // Setup events
  eventEmitter = new events.EventEmitter();
  eventEmitter.on('success', function() {
    callback(null, rootNode);
  });

  eventEmitter.on('error', function(err) {
    callback(err);
  });
  
  try {
    // Begin the directory walk. The code will now end when an appropriate 'success'
    // or 'error' event is emitted.
    walk(rootNode);
  }
  catch(err) {
    eventEmitter.emit('error', err);
  }
};

// Identifies all children of the FileNode passed in. Attaches the children
// to the FileNode. Sends each child to walkDirectory() to determine if the
// child is a directory and needs to be processed in the same way.
// @todo
// It is possible to pass in a file name, rather than a directory name.
// This needs to be fixed.
function walk(currentNode) {

  totalWalksInProgress++;
  fs.readdir(currentNode.getName(), function(err, files) {
    if(err) {
      // Break out of the recursion.
      throw err;
    }
    
    // Store the file and directory names, breadth-first.
    for(var i = 0; i < files.length; i++) {
      var childNodePath = path.join(currentNode.getName(), files[i]);
      var childNode = new FileNode(childNodePath);
      currentNode.addChildNode(childNode);
    }
    
    // Now walk the subdirectories.
    var childNodes = currentNode.getChildNodes();
    for(var i = 0; i < childNodes.length; i++) {
      walkDirectory(childNodes[i]);
    }
    
    totalWalksComplete++;
    if(totalWalksComplete === totalWalksInProgress)
      eventEmitter.emit('success');
  });
}

// Checks the FileNode passed in to determine if it is a directory. If yes,
// then will call walk() to expand the directory contents.
function walkDirectory(childNode) {

  totalWalksInProgress++;
  fs.stat(childNode.getName(), function(err, stats) {
    if(stats.isDirectory()) {
      walk(childNode);
    }
    
    totalWalksComplete++;
    if(totalWalksComplete === totalWalksInProgress)
      eventEmitter.emit('success');
  });
}
