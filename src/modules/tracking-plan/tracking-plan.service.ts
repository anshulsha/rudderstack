import { Injectable } from '@nestjs/common';
import { collectionMapping } from 'src/database/collectionMapping';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrackingPlanRequestDto } from './dto/request/create-tracking-plan.dto';

@Injectable()
export class TrackingPlanService {
  constructor(private readonly dbService: DatabaseService) {}

  async getAllTrackingPlans() {
    return await this.dbService.find(collectionMapping.TrackingPlan);
  }

  async getTrackingPlanById(id: string) {
    return await this.dbService.findOne(collectionMapping.TrackingPlan, {
      _id: id,
    });
  }

  async createTrackingPlan(data: any) {
    const newTrackingPlan = await this.dbService.create(
      collectionMapping.TrackingPlan,
      data,
    );

    return newTrackingPlan;
  }

  async createTrackingPlanWithEvent(trackingPlanData: any, eventData: any) {
    const newTrackingPlan = await this.dbService.create(
      collectionMapping.TrackingPlan,
      trackingPlanData,
    );
    console.log(newTrackingPlan);
    eventData.map(async (data) => {
      const newEvent = await this.dbService.create(
        collectionMapping.Event,
        data,
      );
      newTrackingPlan.rules.push(newEvent._id);

      await this.dbService.updateOne(
        collectionMapping.TrackingPlan,
        { _id: newTrackingPlan._id },
        newTrackingPlan,
      );
    });
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
