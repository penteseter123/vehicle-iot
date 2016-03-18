var http = require('http');


http.createServer((req,res) => {
   res.sendFile('../src/index.html');
}).listen(5000, () => {
   console.log('server is up and running');
});
