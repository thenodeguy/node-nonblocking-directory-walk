'use strict';

function FileNode(name) {
  
  // Reject usage if not invoked as a constructor.
  if(!(this instanceof FileNode)){
    throw new Error('FileNode must be called as a constructor');
  }
  
  this.name = name;
  this.childNodes = [];
  
  this.getName = function() {
    return this.name;
  };

  this.setName = function(name) {
    this.name = name;
  };
  
  this.addChildNode = function(childNode) {
    this.childNodes.push(childNode);
  };
  
  this.getChildNodes = function() {
    return this.childNodes;
  };
}

module.exports = FileNode;
