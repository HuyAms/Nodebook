import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsToMany,
  DataType
} from 'sequelize-typescript'
import NotebookModel from "./notebook";
import NoteNotebookModel from "./noteNoteBook";

@Table({tableName: 'note', modelName: 'NoteModel', timestamps: true})
export default class NoteModel extends Model<NoteModel> {

  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({type: DataType.INTEGER})
  id: number

  @AllowNull(false)
  @Column({type: DataType.STRING})
  noteName: string;

  @AllowNull(false)
  @Column({type: DataType.STRING})
  title: string;

  @AllowNull(false)
  @Column({type: DataType.STRING})
  content: string;

  @BelongsToMany(() => NotebookModel, () => NoteNotebookModel)
  noteBooks: NotebookModel[];
}
