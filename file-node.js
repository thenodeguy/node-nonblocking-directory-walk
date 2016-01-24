'use strict';

module.exports = function createFileNode() {
  return {
    name: null,
    type: null,
    size: null,
    mtime: null,
    childNodes: []
  };
};
