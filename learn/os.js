const os = require('os');
const path = require('path');
const net = require('net');
const dns = require('dns');
const domain = require('node:domain');

const child = domain.create();
const { exec } = require('child_process');

/* =========== Scaling an Application =========== */
exec('ls -al', (err, stdout, stderr) => {
  if (err) return console.error(err);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  return null;
});

/* =========== Operating System =========== */
child.on('error', (err) => {
  console.log('Caught error!', err);
});

dns.lookup('www.google.com', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});

dns.resolve4('www.google.com', (err, addresses) => {
  if (err) throw err;

  console.log(`addresses: ${JSON.stringify(addresses)}`);

  addresses.forEach((a) => {
    dns.reverse(a, (e, hostnames) => {
      if (e) {
        throw e;
      }
      console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
    });
  });
});

const server = net
  .createServer((socket) => {
    socket.end('goodbye');
  })
  .on('error', (err) => {
    throw err;
  });

// server.listen({path: path.join(os.tmpdir(), 'echo.sock')}, () => {
//     console.log('opened server on', server.address());
// });

// server.listen(() => {
//     console.log('opened server on', server.address());
// });

// server.close();

server.getConnections((err, count) => {
  console.log('count', count);
});
