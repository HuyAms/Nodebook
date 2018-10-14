import * as Promise from 'bluebird';
import {CreateUserParams, TokenAttributes} from '../models/interface/userInterface';
import User from '../models/user';
import {sequelize} from '../server';
import APIError from "../util/apiError";
import AuthService from './authService';

export default class UserService {

  static insertUser(user: CreateUserParams): Promise<TokenAttributes> {

    return sequelize.transaction((transaction) => {

      return User.create(user, {transaction}).then((user: User) => {

        const token = AuthService.createTokenResponse(user)

        return {token}

      }).catch((err) =>{

         throw APIError.badRequestError(err.errors[0].message)
      })
    })
  }

  static getUsers() {

    return User.scope('withoutPassword').findAll().then((user: [User]) => {

      return user

    }).catch(() =>{

      throw APIError.internalServerError()
    })
  }
}
