import { CreateEventRequestDto } from './create-event.dto';
export declare class RulesDto {
    events: CreateEventRequestDto[];
}
export declare class CreateTrackingPlanRequestDto {
    display_name: string;
    description: string;
    rules: RulesDto;
}
