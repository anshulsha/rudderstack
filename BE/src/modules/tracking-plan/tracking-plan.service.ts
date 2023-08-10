import { ConflictException, Injectable } from '@nestjs/common';
import { collectionMapping } from '../../database/collectionMapping';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class TrackingPlanService {
  constructor(private readonly dbService: DatabaseService) {}

  async getAllTrackingPlans() {
    return await this.dbService.find(collectionMapping.TrackingPlan);
  }

  async getTrackingPlanById(id: string) {
    return await this.dbService.findById(collectionMapping.TrackingPlan, id);
  }

  async createTrackingPlan(data: any) {
    const newTrackingPlan = await this.dbService.create(
      collectionMapping.TrackingPlan,
      data,
    );

    return newTrackingPlan;
  }

  async createTrackingPlanWithEvent(trackingPlanData: any, eventData: any[]) {
    try {
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

        if (newEvent && newEvent._id)
        arr.push(newEvent._id);
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
    } catch (error) {
      throw error;
    }
  }

  async updateTrackingPlan(id: string, data: any) {
    const updateEvent = await this.dbService.updateOne(
      collectionMapping.TrackingPlan,
      { _id: id },
      data,
    );

    return updateEvent;
  }
}
