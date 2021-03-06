"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const http = require("http");
const config_1 = require("./config/config");
const server_1 = require("./server");
debug('ts-express:index');
const port = normalizePort(config_1.default.port);
server_1.default.set('port', port);
console.log(`Server listening on port ${port}`);
const index = http.createServer(server_1.default);
index.listen(port);
index.on('error', onError);
index.on('listening', onListening);
function normalizePort(val) {
    const port = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    }
    else if (port >= 0) {
        return port;
    }
    else {
        return false;
    }
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
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
function onListening() {
    const addr = index.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
//# sourceMappingURL=index.js.map