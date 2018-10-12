"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = require("../services/authService");
const responseService_1 = require("../services/responseService");
class AuthController {
    login(req, res, next) {
        authService_1.default.login(req, res, next).then(result => res.send(responseService_1.default.successResponse(result)))
            .catch(next);
    }
}
exports.default = AuthController;
//# sourceMappingURL=authController.js.map