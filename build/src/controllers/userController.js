"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = require("../services/userService");
const responseService_1 = require("../services/responseService");
class UserController {
    post(req, res, next) {
        const object = req.body;
        userService_1.default.insertUser(object)
            .then(result => res.send(responseService_1.default.successResponse(result)))
            .catch(next);
    }
    get(req, res, next) {
        userService_1.default.getUsers()
            .then(result => res.send(responseService_1.default.successResponse(result)))
            .catch(next);
    }
    delete(req, res, next) {
        userService_1.default.deleteUser(req.params.id)
            .then(result => res.send(responseService_1.default.successResponse(result)))
            .catch(next);
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map