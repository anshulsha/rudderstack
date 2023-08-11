import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { collectionMapping } from 'src/database/collectionMapping';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);

  constructor(private readonly dbService: DatabaseService) {}

  async getAllEvents() {
    try {
      this.logger.log(`--- Entered in service to fetch all events from db ---`);
      return await this.dbService.find(collectionMapping.Event);
    } catch (e) {
      this.logger.error(
        `--- Error occured in service to fetch all events, Error: ${JSON.stringify(
          e.message,
        )}`,
      );
    }
  }

  async getEventById(id: string) {
    try {
      this.logger.log(
        `--- Entered in service to fetch event from Id, Id:${id} ---`,
      );
      return await this.dbService.findOne(collectionMapping.Event, { _id: id });
    } catch (e) {
      this.logger.error(
        `--- Error occured in service to fetch event from Id, Id: ${id}, Error: ${JSON.stringify(
          e.message,
        )}`,
      );
    }
  }

  async createEvent(data: any) {
    try {
      this.logger.log(
        `--- Entered in service to create new event, data: ${JSON.stringify(
          data,
        )} ---`,
      );
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

      const newEvent = await this.dbService.create(
        collectionMapping.Event,
        data,
      );

      return newEvent;
    } catch (e) {
      this.logger.error(
        `--- Error occured in service to create new event, data: ${JSON.stringify(
          data,
        )}, Error: ${JSON.stringify(e.message)}`,
      );
    }
  }

  async updateEvent(id: string, data: any) {
    try {
      this.logger.log(
        `--- Entered in service to update event with Id, Id:${id}, data: ${JSON.stringify(
          data,
        )} ---`,
      );
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
    } catch (e) {
      this.logger.error(
        `--- Error occured in service to update exsisting event with Id: ${id}, data: ${JSON.stringify(
          data,
        )} Error: ${JSON.stringify(e.message)}`,
      );
    }
  }
}
