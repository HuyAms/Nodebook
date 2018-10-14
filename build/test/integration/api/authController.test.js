"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
const mock_1 = require("../../util/mock");
const dbUtil = require("../../util/db");
const common_1 = require("../../util/common");
const httpStatus = require('http-status');
const expect = chai.expect;
chai.use(chaiHttp);
const chaiAgent = common_1.agent();
describe('[/login]', () => {
    let testUser;
    let testPassword;
    beforeEach(function () {
        const mockUser = mock_1.createUser();
        testPassword = mockUser.password;
        return dbUtil.addUser(mockUser)
            .then(user => { testUser = user; });
    });
    afterEach(function () {
        dbUtil.clearDB();
    });
    describe('[/api/login]', () => {
        it('should return token when login user with username and password', () => {
            const loginParams = {
                username: testUser.username,
                password: testPassword
            };
            return chaiAgent.post('/api/login')
                .send(loginParams)
                .then(res => {
                expect(res).to.have.status(httpStatus.OK);
                const { token } = res.body.data;
                expect(token).to.be.a('string');
            });
        });
    });
});
//# sourceMappingURL=authController.test.js.map