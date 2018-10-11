"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
const server_1 = require("../server");
const apiError_1 = require("../util/apiError");
class UserService {
    insertUser(user) {
        return server_1.sequelize.transaction((transaction) => {
            return userModel_1.default.create(user).then((user) => {
                return this.createUserAttributes(user);
            }).catch((err) => {
                throw apiError_1.default.badRequestError(err.errors[0].message);
            });
        });
    }
    createUserAttributes(user) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            role: user.role
        };
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map