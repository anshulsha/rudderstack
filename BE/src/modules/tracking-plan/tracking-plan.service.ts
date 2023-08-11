import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { collectionMapping } from '../../database/collectionMapping';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class TrackingPlanService {
  private readonly logger = new Logger(TrackingPlanService.name);
  constructor(private readonly dbService: DatabaseService) {}

  async getAllTrackingPlans() {
    try {
      this.logger.log(
        `--- Entered in service to fetch all tracking plans from db ---`,
      );
      return await this.dbService.find(collectionMapping.TrackingPlan);
    } catch (e) {
      this.logger.error(
        `--- Error occured in service to fetch all tracking plans from db, Error: ${JSON.stringify(
          e.message,
        )}`,
      );
    }
  }

  async getTrackingPlanById(id: string) {
    try {
      this.logger.log(
        `--- Entered in service to fetch tracking plan from Id, Id:${id} ---`,
      );
      return await this.dbService.findById(collectionMapping.TrackingPlan, id);
    } catch (e) {
      this.logger.error(
        `--- Error occured in service to fetch tracking plan from Id, Id: ${id}, Error: ${JSON.stringify(
          e.message,
        )}`,
      );
    }
  }

  async createTrackingPlan(data: any) {
    try {
      this.logger.log(
        `--- Entered in service to create new tracking plan, data:${data} ---`,
      );
      const newTrackingPlan = await this.dbService.create(
        collectionMapping.TrackingPlan,
        data,
      );

      return newTrackingPlan;
    } catch (e) {
      this.logger.error(
        `--- Error occured in service to create new tracking plan, Error: ${JSON.stringify(
          e.message,
        )}`,
      );
    }
  }

  async createTrackingPlanWithEvent(trackingPlanData: any, eventData: any[]) {
    try {
      this.logger.log(
        `--- Entered in service to create new tracking plan with events, trackingPlanData:${trackingPlanData}, eventData:${eventData} ---`,
      );
      let display_name = trackingPlanData.display_name;
      const slug = display_name?.toLowerCase().replace(/\s+/g, '_');
      trackingPlanData['slug'] = slug;
      // check for duplicate
      const isAlready = await this.dbService.findOne(
        collectionMapping.TrackingPlan,
        { slug: slug },
      );

      if (isAlready) {
        throw new ConflictException();
      }

      // Create the tracking plan
      const newTrackingPlan = await this.dbService.create(
        collectionMapping.TrackingPlan,
        trackingPlanData,
      );

      const arr = [];
      // Create events and associate them with the tracking plan
      for (const data of eventData) {
        let display_name = data.display_name;
        const slug = display_name?.toLowerCase().replace(/\s+/g, '_');
        data['slug'] = slug;

        // check for duplicate
        const isAlready = await this.dbService.findOne(
          collectionMapping.Event,
          { slug: slug },
        );

        if (isAlready) {
          throw new ConflictException();
        }

        const newEvent = await this.dbService.create(
          collectionMapping.Event,
          data,
        );

        if (newEvent && newEvent._id) arr.push(newEvent._id);
      }

      // Update the tracking plan with associated events
      await this.dbService.updateOne(
        collectionMapping.TrackingPlan,
        { _id: newTrackingPlan._id },
        { rules: { events: arr } },
      );

      return await this.dbService.findById(
        collectionMapping.TrackingPlan,
        newTrackingPlan._id,
      );
    } catch (e) {
      this.logger.error(
        `--- Error occured in service to create new tracking plan with events, trackingPlanData:${trackingPlanData}, eventData:${eventData}, Error: ${JSON.stringify(
          e.message,
        )}`,
      );
    }
  }

  async updateTrackingPlan(id: string, data: any) {
    try {
      this.logger.log(
        `--- Entered in service to update tracking plan with Id, Id:${id}, data: ${JSON.stringify(
          data,
        )} ---`,
      );
      const updateEvent = await this.dbService.updateOne(
        collectionMapping.TrackingPlan,
        { _id: id },
        data,
      );

      return updateEvent;
    } catch (e) {
      this.logger.error(
        `--- Error occured in service to update exsisting tracking plan with Id: ${id}, data: ${JSON.stringify(
          data,
        )} Error: ${JSON.stringify(e.message)}`,
      );
    }
  }
}
