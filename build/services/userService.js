"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
const server_1 = require("../server");
const apiError_1 = require("../util/apiError");
const authService_1 = require("./authService");
class UserService {
    insertUser(user) {
        return server_1.sequelize.transaction((transaction) => {
            return userModel_1.default.create(user, { transaction }).then((user) => {
                return this.createTokenResponse(user);
            }).catch((err) => {
                throw apiError_1.default.badRequestError(err.errors[0].message);
            });
        });
    }
    createTokenResponse(user) {
        const userAttribute = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            role: user.role
        };
        return { token: authService_1.default.createToken(userAttribute) };
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map