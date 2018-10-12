"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
const Promise = require("bluebird");
const passport = require("passport");
const Local = require("passport-local");
const LocalStrategy = Local.Strategy;
const apiError_1 = require("../util/apiError");
passport.use(new LocalStrategy((username, password, done) => {
    user_1.default.findOne({ where: { username: username } })
        .then((user) => {
        if (!user) {
            return done(undefined, false);
        }
        if (user.authenticate(password)) {
            return done(undefined, user);
        }
        else {
            return done(undefined, false);
        }
    });
}));
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
    static login(req, res, next) {
        return new Promise((resolve, reject) => {
            passport.authenticate('local', { session: false }, function (error, user) {
                if (error) {
                    return reject(error);
                }
                if (!user) {
                    return reject(apiError_1.default.unauthorizedError());
                }
                const token = AuthService.createTokenResponse(user);
                return resolve({ token });
            })(req, res, next);
        });
    }
    static createTokenResponse(user) {
        const userAttribute = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            role: user.role
        };
        return AuthService.createToken(userAttribute);
    }
}
exports.default = AuthService;
//# sourceMappingURL=authService.js.map