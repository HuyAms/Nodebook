import User from '../models/userModel'
import * as expressJwt from 'express-jwt'
import * as jwt from 'jsonwebtoken'
import config from '../config/config'
import {UserAttributes} from '../models/interface/userInterface';


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
}
