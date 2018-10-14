"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../src/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
function agent() {
    return chai.request.agent(server_1.default);
}
exports.agent = agent;
function request() {
    return chai.request(server_1.default);
}
exports.request = request;
//# sourceMappingURL=common.js.map