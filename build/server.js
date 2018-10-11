"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const routers_1 = require("./routes/routers");
const sequelize_typescript_1 = require("sequelize-typescript");
const responseService_1 = require("./services/responseService");
const config_1 = require("./config/config");
class Server {
    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
        this.connectDatabase();
    }
    middleware() {
        const app = this.app;
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(morgan('dev'));
        app.use(passport.initialize());
        this.app.use(cors());
    }
    routes() {
        this.app.use('/api/', routers_1.default);
        //Handle Error
        this.app.use((err, req, res, next) => {
            res.status(err.status).json(responseService_1.default.failureResponse(err));
        });
    }
    connectDatabase() {
        this.sequelize = new sequelize_typescript_1.Sequelize(config_1.default.db);
    }
    getSequelize() {
        return this.sequelize;
    }
}
const server = new Server();
exports.default = server.app;
exports.sequelize = server.getSequelize();
//# sourceMappingURL=server.js.map