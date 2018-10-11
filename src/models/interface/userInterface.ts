import {UserRole} from "../userModel";

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
