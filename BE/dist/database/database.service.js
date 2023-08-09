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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const collectionMapping_1 = require("./collectionMapping");
const event_schema_1 = require("./schemas/event.schema");
const tracking_plan_schema_1 = require("./schemas/tracking-plan.schema");
let DatabaseService = exports.DatabaseService = DatabaseService_1 = class DatabaseService {
    constructor(eventModel, trackingPlanModel) {
        this.eventModel = eventModel;
        this.trackingPlanModel = trackingPlanModel;
        this.logger = new common_1.Logger(DatabaseService_1.name);
        this.models = {};
        this.models[collectionMapping_1.collectionMapping.Event] = this.eventModel;
        this.models[collectionMapping_1.collectionMapping.TrackingPlan] = this.trackingPlanModel;
    }
    async create(collection, data) {
        this.logger.log(`--- Creating new document in ${collection} collection, payload: ${JSON.stringify(data)} ---`);
        if (!this.models[collection]) {
            throw new Error(`Model for collection "${collection}" not found.`);
        }
        const new_instance = new this.models[collection](data);
        return await new_instance.save();
    }
    async find(collection) {
        if (!this.models[collection]) {
            throw new Error(`Model for collection "${collection}" not found.`);
        }
        const documents = await this.models[collection].find().exec();
        return documents;
    }
    async findOne(collection, whereClause) {
        if (!this.models[collection]) {
            throw new Error(`Model for collection "${collection}" not found.`);
        }
        const document = await this.models[collection].findOne(whereClause);
        return document;
    }
    async findById(collection, id) {
        if (!this.models[collection]) {
            throw new Error(`Model for collection "${collection}" not found.`);
        }
        const document = await this.models[collection]
            .findById(id)
            .populate('rules.events')
            .exec();
        return document;
    }
    async updateOne(collection, whereClause, data) {
        this.logger.log(`--- Updating exsisting document in ${collection} collection, payload: ${JSON.stringify(data)} ---`);
        if (!this.models[collection]) {
            throw new Error(`Model for collection "${collection}" not found.`);
        }
        const updatedDocument = await this.models[collection].findOneAndUpdate(whereClause, data, { new: true });
        return updatedDocument;
    }
};
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_schema_1.Event.name)),
    __param(1, (0, mongoose_1.InjectModel)(tracking_plan_schema_1.TrackingPlan.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DatabaseService);
//# sourceMappingURL=database.service.js.map