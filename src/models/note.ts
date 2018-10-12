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
import Notebook from "./notebook";
import NoteNotebook from "./noteNoteBook";

@Table({tableName: 'note', modelName: 'Note', timestamps: true})
export default class Note extends Model<Note> {

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

  @BelongsToMany(() => Notebook, () => NoteNotebook)
  noteBooks: Notebook[];
}
