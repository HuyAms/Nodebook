"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const mock_1 = require("../../util/mock");
const userService_1 = require("../../../src/services/userService");
const dbUtil = require("../../util/db");
const httpStatus = require('http-status');
const expect = chai.expect;
describe('[AUTH SERVICE]', () => {
    let testUsername;
    let testPassword;
    before(done => {
        dbUtil.clearDB().finally(done);
    });
    describe('[LOGIN USER]', () => {
        it('should login user with correct username and password', () => {
            const mockUser = mock_1.createUser();
            dbUtil.addUser(mockUser).then(user => {
                userService_1.default;
            });
        });
    });
});
//# sourceMappingURL=authService.test.js.map