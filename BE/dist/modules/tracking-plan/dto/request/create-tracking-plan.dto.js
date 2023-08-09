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
exports.CreateTrackingPlanRequestDto = exports.RulesDto = void 0;
const class_validator_1 = require("class-validator");
const create_event_dto_1 = require("./create-event.dto");
const class_transformer_1 = require("class-transformer");
class RulesDto {
}
exports.RulesDto = RulesDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_event_dto_1.CreateEventRequestDto),
    __metadata("design:type", Array)
], RulesDto.prototype, "events", void 0);
class CreateTrackingPlanRequestDto {
}
exports.CreateTrackingPlanRequestDto = CreateTrackingPlanRequestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTrackingPlanRequestDto.prototype, "display_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTrackingPlanRequestDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", RulesDto)
], CreateTrackingPlanRequestDto.prototype, "rules", void 0);
//# sourceMappingURL=create-tracking-plan.dto.js.map