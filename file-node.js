'use strict';

module.exports = function FileNode(name) {
  
  // Reject usage if not invoked as a constructor.
  if(!(this instanceof FileNode)){
    throw new Error('FileNode must be called as a constructor');
  }
  
  this.name = name;
  this.childNodes = [];
};
