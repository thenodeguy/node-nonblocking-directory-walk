# node-nonblocking-directory-walk

[![Greenkeeper badge](https://badges.greenkeeper.io/bjvickers/node-nonblocking-directory-walk.svg)](https://greenkeeper.io/)

A basic and lean solution for recursively traversing a file structure in a 
non-blocking way.


To install
-
```
$ git clone https://github.com/thenodeguy/node-nonblocking-directory-walk.git
$ cd node-nonblocking-directory-walk
```


Example usage
-
```
'use strict';

const util = require('util');
const fileWalker = require('./file-walker');

fileWalker({rootPath: __dirname}, function(err, rootNode) {
  console.log(util.inspect(rootNode, {showHidden: false, depth:null}));
});
```
