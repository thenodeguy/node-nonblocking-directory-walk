# node-express-auth-local-register
A basic and lean solution for recursively traversing a file structure in a non-blocking way.


To install
-
```
$ git clone https://github.com/benjaminvickers/node-nonblocking-directory-walk.git
$ cd node-nonblocking-directory-walk
```


Example usage
-
```
'use strict';

var fileWalker = require('./file-walker');

fileWalker({rootPath: __dirname}, function(err, rootNode) {
  console.log(require('util').inspect(rootNode, {showHidden: false, depth:null}));
});
```
