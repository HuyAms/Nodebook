"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routers_1 = require("./routes/routers");
class Server {
    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }
    middleware() {
        const app = this.app;
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(morgan('dev'));
        this.app.use(cors());
    }
    routes() {
        this.app.use('/api/', routers_1.default);
    }
}
exports.default = new Server().app;
//# sourceMappingURL=server.js.map