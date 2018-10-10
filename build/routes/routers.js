"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class Router {
    constructor() {
        this.router = express.Router();
        this.setUpRouter();
    }
    setUpRouter() {
        const router = this.router;
        router.get('/user', (req, res) => {
            res.json({ "user": "testUser" });
        });
    }
}
exports.default = new Router().router;
//# sourceMappingURL=routers.js.map