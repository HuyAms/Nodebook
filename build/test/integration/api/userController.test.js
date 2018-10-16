"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const mock_1 = require("../../util/mock");
const dbUtil = require("../../util/db");
const common_1 = require("../../util/common");
const user_1 = require("../../../src/models/user");
const _ = require("lodash");
const userService_1 = require("../../../src/services/userService");
const chaiHttp = require("chai-http");
const Promise = require("bluebird");
const httpStatus = require('http-status');
const expect = chai.expect;
chai.use(chaiHttp);
const chaiAgent = common_1.agent();
const requiredFields = ['username', 'firstName', 'lastName', 'email', 'role'];
describe('[USER API]', () => {
    let testUser;
    let testPassword;
    let testToken;
    let testAdminUser;
    let testAdminPassword;
    let testAdminToken;
    describe('POST /api/user', () => {
        it('Expect 200 with token. Create user with all required fields', () => {
            const mockUser = mock_1.createMockUser();
            return chaiAgent.post('/api/user')
                .send(mockUser)
                .then(res => {
                expect(res).to.have.status(httpStatus.OK);
                const { token } = res.body.data;
                expect(token).to.be.a('string');
            });
        });
        function testMissingFields(missingField) {
            it('Expect 400 with error message. Create user with missing required fields  ' + missingField, () => {
                let mockUser = mock_1.createMockUser(user_1.UserRole.User);
                mockUser = _.omit(mockUser, missingField);
                return chaiAgent.post('/api/user')
                    .send(mockUser)
                    .then(res => {
                    expect(res).to.have.status(httpStatus.BAD_REQUEST);
                    const { message } = res.body;
                    expect(message).to.be.a('string');
                });
                return userService_1.default.insertUser(mockUser)
                    .then(result => expect(result).not.to.be.exist)
                    .catch(error => expect(error.status).to.be.equal(httpStatus.BAD_REQUEST));
            });
        }
        requiredFields.forEach(testMissingFields);
    });
    describe('DELETE /api/user/:id', () => {
        beforeEach(function () {
            const mockUser = mock_1.createMockUser(user_1.UserRole.User);
            testPassword = mockUser.password;
            const mockAdminUser = mock_1.createMockUser(user_1.UserRole.Admin);
            testAdminPassword = mockAdminUser.password;
            return Promise.all([dbUtil.addUser(mockUser), dbUtil.addUser(mockAdminUser)])
                .then(users => {
                testUser = users[0];
                testToken = common_1.createTokenFromUser(testUser.toJSON());
                testAdminUser = users[1];
                testAdminToken = common_1.createTokenFromUser(testAdminUser.toJSON());
            })
                .catch(error => {
                console.log(error);
            });
        });
        afterEach(function () {
            dbUtil.clearDB();
        });
        it('Expect return 200. Admin role deletes existing user', () => {
            return chaiAgent.del('/api/user/' + testUser.id)
                .set('Authorization', testAdminToken)
                .then(res => {
                expect(res).to.have.status(httpStatus.OK);
            });
        });
        it('Expect return 404. Admin role delete non-existing user', () => {
            const nonExistingUserId = 1000;
            return chaiAgent.del('/api/user/' + nonExistingUserId)
                .set('Authorization', testAdminToken)
                .then(res => {
                expect(res).to.have.status(httpStatus.NOT_FOUND);
            });
        });
        it('Expect return 403. User role deletes user', () => {
            return chaiAgent.del('/api/user/' + testUser.id)
                .set('Authorization', testToken)
                .then(res => {
                expect(res).to.have.status(httpStatus.FORBIDDEN);
            });
        });
        it('Expect return 401. Delete user without token', () => {
            return chaiAgent.del('/api/user/' + testUser.id)
                .then(res => {
                expect(res).to.have.status(httpStatus.UNAUTHORIZED);
            });
        });
    });
});
//# sourceMappingURL=userController.test.js.map