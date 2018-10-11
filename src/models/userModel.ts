import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  IsEmail,
  AllowNull,
  Unique,
  BeforeCreate,
  DataType
} from 'sequelize-typescript'
import * as bcrypt from 'bcryptjs'

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
  get password(): string {
    return this.getDataValue('password')
  }

  set password(value: string) {
    this.setDataValue('password', this.hashPassword(value))
  }

  @AllowNull(false)
  @Column({type: DataType.STRING})
  role: UserRole;

  private hashPassword(plainTextPword: string): string {
    if (!plainTextPword) {
      return '';
    } else {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  }
}
