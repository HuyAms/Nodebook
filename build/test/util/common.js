"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../src/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const authService_1 = require("../../src/services/authService");
chai.use(chaiHttp);
function createTokenFromUser(user) {
    if (!user) {
        throw Error('User cannot be null');
    }
    return authService_1.default.createToken(user);
}
exports.createTokenFromUser = createTokenFromUser;
function agent() {
    return chai.request.agent(server_1.default);
}
exports.agent = agent;
//# sourceMappingURL=common.js.map