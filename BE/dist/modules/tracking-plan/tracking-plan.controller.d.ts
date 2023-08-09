import { TrackingPlanService } from './tracking-plan.service';
import { CreateTrackingPlanRequestDto } from './dto/request/create-tracking-plan.dto';
export declare class TrackingPlanController {
    private readonly trackingPlanService;
    constructor(trackingPlanService: TrackingPlanService);
    getAllTrackingPlans(): Promise<any[]>;
    getTrackingPlan(id: string): Promise<any>;
    createTrackingPlanWithEvent(data: CreateTrackingPlanRequestDto): Promise<any>;
    updateTrackingPlan(id: string, data: any): Promise<any>;
}
