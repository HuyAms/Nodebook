import User from '../models/userModel'
import * as expressJwt from 'express-jwt'
import * as jwt from 'jsonwebtoken'
import config from '../config/config'
import * as Promise from 'bluebird'
import * as passport from 'passport'
import * as Local from 'passport-local'
const LocalStrategy = Local.Strategy
import {UserAttributes} from '../models/interface/userInterface';
import APIError from "../util/apiError";

passport.use(new LocalStrategy((username, password, done) => {

  User.findOne({where: {username: username}})
    .then((user: User) => {

      if (!user) {
        return done(undefined, false)
      }

      if (user.authenticate(password)) {
        return done(undefined, user)
      } else {
        return done(undefined, false)
      }
    })
}))


export default class AuthService {

  static verifyJwt(req, res, next) {

    let checkToken = expressJwt({secret: config.secrets.jwt})

    let formattedToken;
    //If found token in query then place it in the header
    if (req.query && req.query.hasOwnProperty('access_token')) {
      formattedToken = 'Bearer ' + req.query.access_token;
      req.headers.authorization = formattedToken;
    }

    formattedToken = 'Bearer ' +  req.headers.authorization;
    req.headers.authorization = formattedToken;

    //call next if token is valid
    //send error if token is invalid, then attached the decoded token to req.user
    checkToken(req, res, next);
  }

  static createToken(user: UserAttributes) {

    const {secrets, expireTime} = config

    return jwt.sign(user, secrets.jwt,  {expiresIn: expireTime})
  }

  static login(req, res, next) {


    return new Promise((resolve, reject) => {

        passport.authenticate('local', {session: false}, function (error, user) {

          if (error) {
            return reject(error)
          }

          if (!user) {
            return reject(APIError.unauthorizedError())
          }

          const token = AuthService.createTokenResponse(user)

          return resolve({token})

        })(req, res, next)
      })
  }

  static createTokenResponse(user: User): string {

    const userAttribute = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role
    }

    return AuthService.createToken(userAttribute)
  }
}
