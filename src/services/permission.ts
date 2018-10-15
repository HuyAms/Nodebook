import {UserRole} from "../models/user";

export enum Permission {
  ReadUser = 'read:user',
  WriteUser = 'write:user'
}

const permissionRole = {
  [UserRole.Admin]: [Permission.ReadUser, Permission.WriteUser],
  [UserRole.User]: [Permission.ReadUser]
}

export const getPermission = (userRole: UserRole) => {

  return permissionRole[userRole]
}
