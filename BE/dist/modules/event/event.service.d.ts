import { DatabaseService } from 'src/database/database.service';
export declare class EventService {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    getAllEvents(): Promise<any[]>;
    getEventById(id: string): Promise<any>;
    createEvent(data: any): Promise<any>;
    updateEvent(id: string, data: any): Promise<any>;
}
