const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Worldn');
  })
  .listen(1337);
console.log('Server running on port 1337');
