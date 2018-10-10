"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userController_1 = require("../controllers/userController");
class Router {
    constructor() {
        this.router = express.Router();
        this.userController = new userController_1.default();
        this.setUpRouter();
    }
    setUpRouter() {
        const router = this.router;
        router.post('/user', this.userController.post);
        router.get('/user', (req, res) => {
            res.json({ "user": "testUser" });
        });
    }
}
exports.default = new Router().router;
//# sourceMappingURL=routers.js.map