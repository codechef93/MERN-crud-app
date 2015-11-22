
const logger = require('node-color-log');
const cors = require("cors");
const bodyParser = require("body-parser");

var database = require('./database');
var router = require('./router');
var config = require('./config.js');

var express = require('express');
var app = express();

app.use(cors());
app.use(bodyParser.json());

var server = require('http').createServer(app);
var port = config.Port;

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall != 'listen') {
      throw error;
    }
    var bind = 'Port ' + port;

    switch (error.code) {
      case 'EACCES':
        logger.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
}

function onListening() {
    logger.info('Listening on port: ' + port);

    database.init();
    router.init(app);
}