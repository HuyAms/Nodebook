import * as faker from 'faker'
import {UserRole} from '../../src/models/user'

export const createUser = (role?: UserRole) => {

  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const username = faker.internet.userName()
  const email = faker.internet.email()
  const password = faker.internet.password(10)

  return {
    firstName,
    lastName,
    username,
    email,
    password,
    role: role || UserRole.Admin
  }
}
