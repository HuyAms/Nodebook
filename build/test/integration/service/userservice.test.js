"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const _ = require("lodash");
const mock_1 = require("../../util/mock");
const userService_1 = require("../../../src/services/userService");
const dbUtil = require("../../util/db");
const user_1 = require("../../../src/models/user");
const httpStatus = require('http-status');
const expect = chai.expect;
describe('[USER SERVICE]', () => {
    before(done => {
        dbUtil.clearDB().finally(done);
    });
    describe('[CREATE USER]', () => {
        it('should create user with all required fields', () => {
            const mockUser = mock_1.createUser();
            return userService_1.default.insertUser(mockUser)
                .then(result => {
                expect(result.token).to.be.a('string');
            });
        });
        function testMissingFields(missingField) {
            it('show throw error due to missing field ' + missingField, () => {
                let mockUser = mock_1.createUser(user_1.UserRole.User);
                mockUser = _.omit(mockUser, missingField);
                return userService_1.default.insertUser(mockUser)
                    .then(result => expect(result).not.to.be.exist)
                    .catch(error => expect(error.status).to.be.equal(httpStatus.BAD_REQUEST));
            });
        }
        ['username', 'firstName', 'lastName', 'email', 'role'].forEach(testMissingFields);
    });
});
//# sourceMappingURL=userservice.test.js.map