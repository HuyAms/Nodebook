"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../src/models/user");
const note_1 = require("../../src/models/note");
const notebook_1 = require("../../src/models/notebook");
const noteNoteBook_1 = require("../../src/models/noteNoteBook");
const server_1 = require("../../src/server");
server_1.server.connectDatabase();
exports.clearDB = () => {
    return noteNoteBook_1.default.destroy({ where: {} })
        .then(() => note_1.default.destroy({ where: {} }))
        .then(() => notebook_1.default.destroy({ where: {} }))
        .then(() => user_1.default.destroy({ where: {} }));
};
exports.addUser = (mockUser) => {
    return user_1.default.create(mockUser);
};
//# sourceMappingURL=db.js.map