"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
var Permission;
(function (Permission) {
    Permission["ReadUser"] = "read:user";
    Permission["WriteUser"] = "write:user";
})(Permission || (Permission = {}));
const permissionRole = {
    [user_1.UserRole.Admin]: [Permission.ReadUser, Permission.WriteUser],
    [user_1.UserRole.User]: [Permission.WriteUser]
};
exports.getPermission = (userRole) => {
    return permissionRole[userRole];
};
//# sourceMappingURL=permissionService.js.map