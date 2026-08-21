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
exports.hasNumber = exports.hasLower = exports.hasUpper = exports.hasSpecial = exports.UserDTO = void 0;
const classes_1 = require("@automapper/classes");
const class_validator_1 = require("class-validator");
const location_dto_1 = require("./location.dto");
class UserDTO {
}
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDTO.prototype, "fname", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDTO.prototype, "lname", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, {
        message: 'email must be of valid email address',
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "email", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "rewardPoints", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object) => {
        var _a;
        return !(((_a = object === null || object === void 0 ? void 0 : object.password) === null || _a === void 0 ? void 0 : _a.length) > 7 &&
            hasSpecial(object === null || object === void 0 ? void 0 : object.password) &&
            hasUpper(object === null || object === void 0 ? void 0 : object.password) &&
            hasLower(object === null || object === void 0 ? void 0 : object.password) &&
            hasNumber(object === null || object === void 0 ? void 0 : object.password));
    }),
    (0, class_validator_1.IsString)({ message: 'password must be valid' }),
    __metadata("design:type", String)
], UserDTO.prototype, "nonexisting", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "imageUrl", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "allowPush", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "phone", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "dob", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", location_dto_1.LocationDTO)
], UserDTO.prototype, "location", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "nina", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "language", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "externalId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "gender", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "age", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "organization", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "mainCrop", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "secondaryCrop", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "otherProducts", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "activities", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "liveStockFarming", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "smallTrade", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "profession", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "meansOfProduction", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "meansOfTransport", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "financialEducation", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "accessToCredit", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "accessToInsurance", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "accessToGap", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "totalArea", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "totalUsedArea", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "cultivatedArea", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "actualArea", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "propertyStatus", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "longitude", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "latitude", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "forecastedSurfaceArea", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "authorizedSurfaceArea", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "literacyLevel", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "numOfChildren", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserDTO.prototype, "maritalStatus", void 0);
exports.UserDTO = UserDTO;
function hasSpecial(pass) {
    return /[*@$!#%&()^~{}\-_]+/.test(pass);
}
exports.hasSpecial = hasSpecial;
function hasUpper(pass) {
    return /[A-Z]+/.test(pass);
}
exports.hasUpper = hasUpper;
function hasLower(pass) {
    return /[a-z]+/.test(pass);
}
exports.hasLower = hasLower;
function hasNumber(pass) {
    return /[0-9]+/.test(pass);
}
exports.hasNumber = hasNumber;
//# sourceMappingURL=user.dto.js.map