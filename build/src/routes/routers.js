"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
const authService_1 = require("../services/authService");
const permission_1 = require("../services/permission");
class Router {
    constructor() {
        this.router = express.Router();
        this.userController = new userController_1.default();
        this.authController = new authController_1.default();
        this.setUpRouter();
    }
    setUpRouter() {
        const router = this.router;
        const checkUserWithPermission = (permissions) => {
            return [authService_1.default.verifyJwt(), authService_1.default.checkPermission(permissions)];
        };
        const writeUser = checkUserWithPermission([permission_1.Permission.WriteUser]);
        const readUser = checkUserWithPermission([permission_1.Permission.ReadUser]);
        //AUTH
        router.post('/login', this.authController.login);
        //USER
        router.post('/user', this.userController.post);
        router.get('/user', readUser, this.userController.get);
        router.delete('/user/:id', writeUser, this.userController.delete);
    }
}
exports.default = new Router().router;
//# sourceMappingURL=routers.js.map