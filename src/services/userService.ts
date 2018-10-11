import * as Promise from 'bluebird';
import {CreateUserParams, UserAttributes, TokenAttributes} from '../models/interface/userInterface';
import User from '../models/userModel';
import {sequelize} from '../server';
import APIError from "../util/apiError";
import AuthService from './authService';

class UserService {

  public insertUser(user: CreateUserParams): Promise<TokenAttributes> {

    return sequelize.transaction((transaction) => {

      return User.create(user, {transaction}).then((user: User) => {

        return this.createTokenResponse(user)

      }).catch((err) =>{

         throw APIError.badRequestError(err.errors[0].message)
      })
    })
  }

  public createTokenResponse(user: User): TokenAttributes {

    const userAttribute = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role
    }

    return {token: AuthService.createToken(userAttribute)}
  }
}

export default new UserService()
