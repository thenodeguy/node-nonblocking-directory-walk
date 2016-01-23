'use strict';

var fs = require('fs');
var path = require('path');
var events = require('events');
var FileNode = require('./file-node');

var rootNode = null;
var callback = null;

var totalWalksInProgress = 0;
var totalWalksComplete = 0;


/**
 * The entry point.
 */
function FileWalker(rootNodeIn, callbackIn) {

  totalWalksInProgress = 0;
  totalWalksComplete = 0;  
  
  rootNode = rootNodeIn;
  callback = callbackIn;
  
  // Begin the directory walk.
  try {
    Walk(rootNode);
  }
  catch(err) {
    eventEmitter.emit('error', err);
  }
}

function Walk(currentNode) {

  totalWalksInProgress++;
  fs.readdir(currentNode.getName(), function(err, files) {
    if(err) {
      // Break out of the recursion.
      throw err;
    }
    
    // Store the file and directory names, breadth-first.
    for(var i = 0; i < files.length; i++) {
      var childNode = new FileNode();
      childNode.setName(path.join(currentNode.getName(), files[i]));
      currentNode.addChildNode(childNode);
    }
    
    // Now walk the subdirectories.
    var childNodes = currentNode.getChildNodes();
    for(var i = 0; i < childNodes.length; i++) {
      WalkDirectory(childNodes[i]);
    }
    
    seekCompletion();
    
    function WalkDirectory(childNode) {
    
      totalWalksInProgress++;
      fs.stat(childNode.getName(), function(err, stats) {
        if(stats.isDirectory()) {
          Walk(childNode);
        }
        
        seekCompletion();
      });
    }
    
    function seekCompletion() {
      totalWalksComplete++;
      if(totalWalksComplete == totalWalksInProgress) {
        eventEmitter.emit('success');
      }
    }
  });
}

/**
 * The exit points.
 */
var eventEmitter = new events.EventEmitter();
eventEmitter.on('success', function() {
  callback(null, rootNode);
});

eventEmitter.on('error', function(err) {
  callback(err);
});

module.exports = FileWalker;
