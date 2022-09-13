const http = require('http');

const PORT = 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Hello World!\n');
  } else if (req.url === '/goodbye') {
    res.end('Goodbye!\n');
  } else {
    res.end('404\n');
  }
});

server.listen(PORT, () => {
  console.log('server started', server.address().port);
});
