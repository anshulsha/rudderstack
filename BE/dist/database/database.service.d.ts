import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import { TrackingPlan } from './schemas/tracking-plan.schema';
export declare class DatabaseService {
    private eventModel;
    private trackingPlanModel;
    private readonly logger;
    private models;
    constructor(eventModel: Model<Event>, trackingPlanModel: Model<TrackingPlan>);
    create(collection: string, data: any): Promise<any>;
    find(collection: string): Promise<any[]>;
    findOne(collection: string, whereClause: any): Promise<any>;
    findById(collection: string, id: any): Promise<any>;
    updateOne(collection: string, whereClause: any, data: any): Promise<any>;
}
