import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  IsEmail,
  AllowNull,
  Unique,
  DataType
} from 'sequelize-typescript';

export enum UserRole {
  Admin = 'admin',
  User = 'user'
}

@Table({tableName: 'user', modelName: 'UserModel', timestamps: true})
export default class UserModel extends Model<UserModel> {

  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({type: DataType.INTEGER})
  id: number

  @AllowNull(false)
  @Column({type: DataType.STRING})
  firstName: string;

  @AllowNull(false)
  @Column({type: DataType.STRING})
  lastName: string;

  @AllowNull(false)
  @Unique
  @Column({type: DataType.STRING})
  username: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column({type: DataType.STRING})
  email: string;

  @AllowNull(false)
  @Column({type: DataType.STRING})
  password: string;

  @AllowNull(false)
  @Column({type: DataType.STRING})
  role: UserRole;
}
