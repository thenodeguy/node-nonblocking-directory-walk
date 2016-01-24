'use strict';

module.exports = function FileNode() {
  
  // Reject usage if not invoked as a constructor.
  if(!(this instanceof FileNode)){
    throw new Error('FileNode must be called as a constructor');
  }
  
  this.name = null;
  this.type = null;
  this.size = null;
  this.mtime = null;
  this.childNodes = [];
};
