import * as Promise from 'bluebird';
import {CreateUserParams, TokenAttributes} from '../models/interface/userInterface';
import User from '../models/user';
import {sequelize} from '../server';
import APIError, {ErrorMessage} from "../util/apiError";
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

    }).catch(() => {

      throw APIError.internalServerError()
    })
  }

  static deleteUser(id: number) {

    return User.scope('withoutPassword').findById(id).then(user => {
      return user.destroy().then(() => user)
        .catch(() => {throw APIError.internalServerError()})
    }).then(user => user)
      .catch(() =>{ throw APIError.notFoundError(ErrorMessage.USER_NOT_FOUND)})
  }
}
