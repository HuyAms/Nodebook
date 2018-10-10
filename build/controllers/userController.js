"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = require("../services/userService");
const responseService_1 = require("../services/responseService");
class UserController {
    post(req, res, next) {
        const object = req.body;
        userService_1.default.insertUser(object)
            .then(result => res.send(responseService_1.default.successResponse(result)))
            .catch(error => res.send(responseService_1.default.failureResponse(error)));
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map