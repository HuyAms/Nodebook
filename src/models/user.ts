import * as bcrypt from 'bcryptjs'
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  IsEmail,
  AllowNull,
  Unique,
  HasMany,
  Scopes,
  DataType
} from 'sequelize-typescript'
import Notebook from "./notebook";

export enum UserRole {
  Admin = 'admin',
  User = 'user'
}

@Scopes({
  withoutPassword: {
    attributes: { exclude: ['password'] }
  }
})

@Table({tableName: 'user', modelName: 'User', timestamps: true})
export default class User extends Model<User> {

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

  @HasMany(() => Notebook)
  notebooks: Notebook[];

  public authenticate(plainTextPword: string): boolean {
    return bcrypt.compareSync(plainTextPword, this.password);
  }

  private hashPassword(plainTextPword: string): string {
    if (!plainTextPword) {
      return '';
    } else {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  }

}
