import { ConflictException, Injectable } from '@nestjs/common';
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
    let display_name = data.display_name;
    const slug = display_name?.toLowerCase().replace(/\s+/g, '_');
    data['slug'] = slug;

    // check for duplicate
    const isAlready = await this.dbService.findOne(collectionMapping.Event, {
      slug: slug,
    });

    if (isAlready) {
      throw new ConflictException();
    }

    const newEvent = await this.dbService.create(collectionMapping.Event, data);

    return newEvent;
  }

  async updateEvent(id: string, data: any) {
    let display_name = data.display_name;
    const slug = display_name?.toLowerCase().replace(/\s+/g, '_');
    data['slug'] = slug;

    // check for duplicate
    const isAlready = await this.dbService.findOne(collectionMapping.Event, {
      slug: slug,
    });

    if (isAlready) {
      throw new ConflictException();
    }

    const updateEvent = await this.dbService.updateOne(
      collectionMapping.Event,
      { _id: id },
      data,
    );

    return updateEvent;
  }
}
