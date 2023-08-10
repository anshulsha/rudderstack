import { DatabaseService } from '../../database/database.service';
export declare class TrackingPlanService {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    getAllTrackingPlans(): Promise<any[]>;
    getTrackingPlanById(id: string): Promise<any>;
    createTrackingPlan(data: any): Promise<any>;
    createTrackingPlanWithEvent(trackingPlanData: any, eventData: any[]): Promise<any>;
    updateTrackingPlan(id: string, data: any): Promise<any>;
}
