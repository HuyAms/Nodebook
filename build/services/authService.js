"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
class AuthService {
    static verifyJwt(req, res, next) {
        let checkToken = expressJwt({ secret: config_1.default.secrets.jwt });
        let formattedToken;
        //If found token in query then place it in the header
        if (req.query && req.query.hasOwnProperty('access_token')) {
            formattedToken = 'Bearer ' + req.query.access_token;
            req.headers.authorization = formattedToken;
        }
        formattedToken = 'Bearer ' + req.headers.authorization;
        req.headers.authorization = formattedToken;
        //call next if token is valid
        //send error if token is invalid, then attached the decoded token to req.user
        checkToken(req, res, next);
    }
    static createToken(user) {
        const { secrets, expireTime } = config_1.default;
        return jwt.sign(user, secrets.jwt, { expiresIn: expireTime });
    }
}
exports.default = AuthService;
//# sourceMappingURL=authService.js.map