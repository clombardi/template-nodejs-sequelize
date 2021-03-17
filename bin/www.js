#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Module dependencies.
 */

const debugPkg = require('debug');
const http = require('http');
const app = require('../lib/app');
const db = require('../lib/models');

const debug = debugPkg('js/www:server');

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on the port set on the app, on all network interfaces.
 */

// cfr. https://stackoverflow.com/questions/25337222/javascript-app-setport-8080-versus-app-listen8080-in-express-js
const port = app.get('port');

// Run sequelize before listen
db.sequelize.authenticate().then(() => {
  app.listen(port, () => {
    console.log(`¡Aplicación iniciada! ====> 🌎 http://localhost:${port}`);
  });
});

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
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
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
