import UserModel from "./user";
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
  DataType, BelongsToMany
} from 'sequelize-typescript'
import NoteNotebookModel from "./noteNoteBook";
import NoteModel from "./note";

@Table({tableName: 'notebook', modelName: 'NotebookModel', timestamps: true})
export default class NotebookModel extends Model<NotebookModel> {

  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({type: DataType.INTEGER})
  id: number

  @BelongsTo(() => UserModel)
  user: UserModel;

  @BelongsToMany(() => NoteModel, () => NoteNotebookModel)
  notes: NoteModel[];
}
