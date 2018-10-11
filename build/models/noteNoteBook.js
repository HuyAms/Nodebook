"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const note_1 = require("./note");
const notebook_1 = require("./notebook");
let NoteNotebookModel = class NoteNotebookModel extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => note_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], NoteNotebookModel.prototype, "noteId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => notebook_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], NoteNotebookModel.prototype, "notebookId", void 0);
NoteNotebookModel = __decorate([
    sequelize_typescript_1.Table({ tableName: 'note_notebook', modelName: 'NoteNotebookModel', timestamps: true })
], NoteNotebookModel);
exports.default = NoteNotebookModel;
//# sourceMappingURL=noteNoteBook.js.map