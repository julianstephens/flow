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
exports.UserModel = void 0;
const schema_1 = require("@tsed/schema");
const enums_1 = require("../enums");
class UserModel {
}
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    (0, schema_1.Groups)("profile", "!creation"),
    __metadata("design:type", Number)
], UserModel.prototype, "id", void 0);
__decorate([
    (0, schema_1.Property)(String),
    (0, schema_1.Required)(),
    (0, schema_1.Description)("User full name. Must be their legal name."),
    __metadata("design:type", String)
], UserModel.prototype, "fullName", void 0);
__decorate([
    (0, schema_1.Property)(String),
    (0, schema_1.Required)(),
    (0, schema_1.Description)("User nickname."),
    __metadata("design:type", String)
], UserModel.prototype, "shortName", void 0);
__decorate([
    (0, schema_1.Property)(String),
    (0, schema_1.Required)(),
    (0, schema_1.Email)(),
    (0, schema_1.Description)("User email. This email must be unique!"),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    (0, schema_1.Required)(),
    (0, schema_1.Enum)(enums_1.Role),
    __metadata("design:type", Array)
], UserModel.prototype, "roles", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], UserModel.prototype, "createdAt", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], UserModel.prototype, "updatedAt", void 0);
exports.UserModel = UserModel;
