const os = require('os');
const path = require('path');
const net = require('net');
const dns = require('dns');
const domain = require('domain');
const child = domain.create();

child.on('error', function(err) {
    console.log('Caught error!', err);
});




dns.lookup('www.google.com', (err, address, family) => {
    console.log('address: %j family: IPv%s', address, family);
});

dns.resolve4('www.google.com', (err, addresses) => {
    if (err) throw err;

    console.log(`addresses: ${JSON.stringify(addresses)}`);

    addresses.forEach((a) => {
        dns.reverse(a, (err, hostnames) => {
            if (err) {
                throw err;
            }
            console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
        });
    });
});

const server = net.createServer((socket) => {
    socket.end('goodbye');
}).on('error', (err) => {
    throw err;
});

// server.listen({path: path.join(os.tmpdir(), 'echo.sock')}, () => {
//     console.log('opened server on', server.address());
// });

server.listen(() => {
    console.log('opened server on', server.address());
});

// server.close();

server.getConnections((err, count) => {
    console.log('count', count);
});