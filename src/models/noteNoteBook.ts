import {
  Table,
  Column,
  Model,
  ForeignKey
} from 'sequelize-typescript'
import NoteModel from "./note";
import NotebookModel from "./notebook";

@Table({tableName: 'note_notebook', modelName: 'NoteNotebookModel', timestamps: true})
export default class NoteNotebookModel extends Model<NoteNotebookModel> {

  @ForeignKey(() => NoteModel)
  @Column
  noteId: number;

  @ForeignKey(() => NotebookModel)
  @Column
  notebookId: number;
}
