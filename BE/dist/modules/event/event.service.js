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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const collectionMapping_1 = require("../../database/collectionMapping");
const database_service_1 = require("../../database/database.service");
let EventService = exports.EventService = class EventService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async getAllEvents() {
        return await this.dbService.find(collectionMapping_1.collectionMapping.Event);
    }
    async getEventById(id) {
        return await this.dbService.findOne(collectionMapping_1.collectionMapping.Event, { _id: id });
    }
    async createEvent(data) {
        const newEvent = await this.dbService.create(collectionMapping_1.collectionMapping.Event, data);
        return newEvent;
    }
    async updateEvent(id, data) {
        const updateEvent = await this.dbService.updateOne(collectionMapping_1.collectionMapping.Event, { _id: id }, data);
        return updateEvent;
    }
};
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], EventService);
//# sourceMappingURL=event.service.js.map