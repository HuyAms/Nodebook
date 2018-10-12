"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
class Router {
    constructor() {
        this.router = express.Router();
        this.userController = new userController_1.default();
        this.authController = new authController_1.default();
        this.setUpRouter();
    }
    setUpRouter() {
        const router = this.router;
        router.post('/login', this.authController.login);
        router.post('/user', this.userController.post);
    }
}
exports.default = new Router().router;
//# sourceMappingURL=routers.js.map