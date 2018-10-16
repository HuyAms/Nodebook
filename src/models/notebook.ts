import User from "./user";
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
  DataType, BelongsToMany, ForeignKey
} from 'sequelize-typescript'
import noteNotebook from "./noteNoteBook";
import Note from "./note";

@Table({tableName: 'notebook', modelName: 'Notebook', timestamps: true})
export default class Notebook extends Model<Notebook> {

  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({type: DataType.INTEGER})
  id: number

  @AllowNull(false)
  @Column({type: DataType.STRING})
  notebookName: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number

  @BelongsTo(() => User)
  user: User

  @BelongsToMany(() => Note, () => noteNotebook)
  notes: Note[]
}
