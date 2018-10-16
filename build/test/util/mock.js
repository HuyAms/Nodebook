"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker");
const user_1 = require("../../src/models/user");
exports.createMockUser = (role) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password(10);
    return {
        firstName,
        lastName,
        username,
        email,
        password,
        role: role || user_1.UserRole.Admin
    };
};
//# sourceMappingURL=mock.js.map