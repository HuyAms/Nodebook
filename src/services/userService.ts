import * as Promise from 'bluebird';
import {CreateUserParams, UserAttributes} from '../models/interface/userInterface';
import User, {UserRole} from '../models/userModel';
import {sequelize} from '../server';

class UserService {

  public insertUser(user: CreateUserParams): Promise<UserAttributes> {

    return sequelize.transaction((transaction) => {
      return User.create(user).then((user: User) => {
        return this.createUserAttributes(user)
      }).catch((err) =>{
         throw Error(err.errors[0].message)
      })
    })
  }

  public createUserAttributes(user: User): UserAttributes {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role
    }
  }
}

export default new UserService()
