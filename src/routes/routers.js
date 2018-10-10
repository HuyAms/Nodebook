"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Router = /** @class */ (function () {
    function Router() {
        this.router = express.Router();
        this.setUpRouter();
    }
    Router.prototype.setUpRouter = function () {
        var router = this.router;
        router.get('/user', function (req, res) {
            res.json({ "user": "testUser" });
        });
    };
    return Router;
}());
exports.default = new Router().router;
