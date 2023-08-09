import { EventService } from './event.service';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    getAllEvents(): Promise<any[]>;
    getEvent(id: string): Promise<any>;
    createEvent(data: any): Promise<any>;
    updateEvent(id: string, data: any): Promise<any>;
}
