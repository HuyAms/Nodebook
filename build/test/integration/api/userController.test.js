"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
const mock_1 = require("../../util/mock");
const dbUtil = require("../../util/db");
const common_1 = require("../../util/common");
const user_1 = require("../../../src/models/user");
const _ = require("lodash");
const userService_1 = require("../../../src/services/userService");
const httpStatus = require('http-status');
const expect = chai.expect;
chai.use(chaiHttp);
const chaiAgent = common_1.agent();
const requiredFields = ['username', 'firstName', 'lastName', 'email', 'role'];
describe('[USER API]', () => {
    let testUser;
    let testPassword;
    beforeEach(function () {
        const mockUser = mock_1.createMockUser();
        testPassword = mockUser.password;
        return dbUtil.addUser(mockUser)
            .then(user => { testUser = user; });
    });
    afterEach(function () {
        dbUtil.clearDB();
    });
    describe('POST /api/user', () => {
        it('Send user fields. Expect return 200 with token', () => {
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
            it('Send user with missing required fields  ' + missingField + '. Expect return status 400 with error message', () => {
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
});
//# sourceMappingURL=userController.test.js.map