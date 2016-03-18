'use strict';

var http = require('http');
var fs = require('fs');


http.createServer((req,res) => {
   fs.readFile('./src/index.html', (err, file) => {
      res.writeHeader(200,{'Content-type':'text/html'});
      res.write(file);
      res.end();
   });
}).listen(8000);
