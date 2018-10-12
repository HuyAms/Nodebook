
import User from '../../src/models/user'
import Note from '../../src/models/note'
import Notebook from '../../src/models/notebook'
import NoteNoteBook from '../../src/models/noteNoteBook'
import {server} from '../../src/server'

server.connectDatabase()

export const clearDB = () => {
  return NoteNoteBook.destroy({where: {}})
    .then(() => Note.destroy({where: {}}))
    .then(() => Notebook.destroy({where: {}}))
    .then(() => User.destroy({where: {}}))
}

export const addUser = (mockUser) => {
  return User.create(mockUser)
}


