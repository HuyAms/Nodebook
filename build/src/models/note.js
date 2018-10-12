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
const notebook_1 = require("./notebook");
const noteNoteBook_1 = require("./noteNoteBook");
let Note = class Note extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Note.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Note.prototype, "noteName", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Note.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Note.prototype, "content", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => notebook_1.default, () => noteNoteBook_1.default),
    __metadata("design:type", Array)
], Note.prototype, "noteBooks", void 0);
Note = __decorate([
    sequelize_typescript_1.Table({ tableName: 'note', modelName: 'Note', timestamps: true })
], Note);
exports.default = Note;
//# sourceMappingURL=note.js.map