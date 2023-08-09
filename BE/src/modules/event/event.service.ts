import { Injectable } from '@nestjs/common';
import { collectionMapping } from 'src/database/collectionMapping';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EventService {
  constructor(private readonly dbService: DatabaseService) {}

  async getAllEvents() {
    return await this.dbService.find(collectionMapping.Event);
  }

  async getEventById(id: string) {
    return await this.dbService.findOne(collectionMapping.Event, { _id: id });
  }

  async createEvent(data: any) {
    const newEvent = await this.dbService.create(collectionMapping.Event, data);

    return newEvent;
  }

  async updateEvent(id: string, data: any) {
    const updateEvent = await this.dbService.updateOne(
      collectionMapping.Event,
      { _id: id },
      data,
    );

    return updateEvent;
  }
}
