#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var cluster = require('cluster');
var debug = require('debug')('projects:server');
var http = require('http');
var numCPUs = require('os').cpus().length / 2;
const mongoose = require('mongoose');
let DB = process.env.MONGODB_URI;
if (process.env.ENVIRONMENT === 'testing' || process.env.ENVIRONMENT === "ci") {
  DB = process.env.TEST_MONGODB_URI;
}

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);
if (process.env.ENVIRONMENT === "prod" || process.env.ENVIRONMENT === "ci") {
  console.log("Total CPUs Used For Cluster Mode:", numCPUs);
  if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    // If a worker dies, log it to the console and start another worker.
    cluster.on('exit', function (worker, code, signal) {
      console.log('Worker ' + worker.process.pid + ' died.');
      cluster.fork();
    });

    // Log when a worker starts listening
    cluster.on('listening', function (worker, address) {
      console.log('Worker started with PID ' + worker.process.pid + '.');
    });

  } else {
    /**
     * Create HTTP server.
     */

    var server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    ; (async function () {
      try {
        mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
          .then(() => {
            console.log(`MongoDB Connected: ${process.env.ENVIRONMENT}`)
          })
          .catch(err => console.log(err));
        server.listen(port);
      } catch (err) {
        console.log(err)
      }
    })()
    server.on('error', onError);
    server.on('listening', onListening);
  }
}
else {
  /**
* Create HTTP server.
*/

  var server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  ; (async function () {
    try {
      mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          console.log(`MongoDB Connected: ${process.env.ENVIRONMENT}`)
        })
        .catch(err => console.log(err));
      server.listen(port);
    } catch (err) {
      // console.error(err);
      console.log(err)
    }
  })()
  server.on('error', onError);
  server.on('listening', onListening);
}
// The rest of the bin/www file.....

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log("App Started on: " + bind)
}