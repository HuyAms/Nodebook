import {UserRole} from "../user";

export interface UserAttributes {
  id?: number
  firstName: string
  lastName: string
  email: string,
  username: string,
  role: UserRole
}

export interface CreateUserParams extends UserAttributes {
  password: string
}


export interface TokenAttributes {
  token: string
}
