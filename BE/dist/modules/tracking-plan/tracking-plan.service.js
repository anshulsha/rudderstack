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
exports.TrackingPlanService = void 0;
const common_1 = require("@nestjs/common");
const collectionMapping_1 = require("../../database/collectionMapping");
const database_service_1 = require("../../database/database.service");
let TrackingPlanService = exports.TrackingPlanService = class TrackingPlanService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async getAllTrackingPlans() {
        return await this.dbService.find(collectionMapping_1.collectionMapping.TrackingPlan);
    }
    async getTrackingPlanById(id) {
        return await this.dbService.findById(collectionMapping_1.collectionMapping.TrackingPlan, id);
    }
    async createTrackingPlan(data) {
        const newTrackingPlan = await this.dbService.create(collectionMapping_1.collectionMapping.TrackingPlan, data);
        return newTrackingPlan;
    }
    async createTrackingPlanWithEvent(trackingPlanData, eventData) {
        try {
            const newTrackingPlan = await this.dbService.create(collectionMapping_1.collectionMapping.TrackingPlan, trackingPlanData);
            const arr = [];
            for (const data of eventData) {
                const newEvent = await this.dbService.create(collectionMapping_1.collectionMapping.Event, data);
                arr.push(newEvent._id);
            }
            await this.dbService.updateOne(collectionMapping_1.collectionMapping.TrackingPlan, { _id: newTrackingPlan._id }, { rules: { events: arr } });
            return await this.dbService.findById(collectionMapping_1.collectionMapping.TrackingPlan, newTrackingPlan._id);
        }
        catch (error) {
            throw error;
        }
    }
    async updateTrackingPlan(id, data) {
        const updateEvent = await this.dbService.updateOne(collectionMapping_1.collectionMapping.TrackingPlan, { _id: id }, data);
        return updateEvent;
    }
};
exports.TrackingPlanService = TrackingPlanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], TrackingPlanService);
//# sourceMappingURL=tracking-plan.service.js.map