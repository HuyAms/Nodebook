import {
  Table,
  Column,
  Model,
  ForeignKey, AllowNull
} from 'sequelize-typescript'
import Note from "./note";
import Notebook from "./notebook";

@Table({tableName: 'note_notebook', modelName: 'NoteNotebook', timestamps: true})
export default class NoteNotebook extends Model<NoteNotebook> {

  @AllowNull(false)
  @ForeignKey(() => Note)
  @Column
  noteId: number;

  @AllowNull(false)
  @ForeignKey(() => Notebook)
  @Column
  notebookId: number;
}
