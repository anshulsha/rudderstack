import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { collectionMapping } from './collectionMapping';
import { Event } from './schemas/event.schema';
import { TrackingPlan } from './schemas/tracking-plan.schema';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  private models: Record<string, Model<any>> = {};
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(TrackingPlan.name)
    private trackingPlanModel: Model<TrackingPlan>,
  ) {
    this.models[collectionMapping.Event] = this.eventModel;
    this.models[collectionMapping.TrackingPlan] = this.trackingPlanModel;
    // Add more models here if needed
  }

  async create(collection: string, data: any) {
    this.logger.log(
      `--- Creating new document in ${collection} collection, payload: ${JSON.stringify(
        data,
      )} ---`,
    );
    if (!this.models[collection]) {
      throw new Error(`Model for collection "${collection}" not found.`);
    }
    const new_instance = new this.models[collection](data);
    return await new_instance.save();
  }

  async find(collection: string) {
    if (!this.models[collection]) {
      throw new Error(`Model for collection "${collection}" not found.`);
    }
    const documents = await this.models[collection].find().exec();
    return documents;
  }

  async findOne(collection: string, whereClause: any) {
    if (!this.models[collection]) {
      throw new Error(`Model for collection "${collection}" not found.`);
    }
    const document = await this.models[collection].findOne(whereClause);
    return document;
  }

  async findById(collection: string, id: any) {
    if (!this.models[collection]) {
      throw new Error(`Model for collection "${collection}" not found.`);
    }
    const document = await this.models[collection]
      .findById(id)
      .populate('rules.events')
      .exec();
    return document;
  }

  async updateOne(collection: string, whereClause: any, data: any) {
    this.logger.log(
      `--- Updating exsisting document in ${collection} collection, payload: ${JSON.stringify(
        data,
      )} ---`,
    );
    if (!this.models[collection]) {
      throw new Error(`Model for collection "${collection}" not found.`);
    }

    const updatedDocument = await this.models[collection].findOneAndUpdate(
      whereClause,
      data,
      { new: true },
    );

    return updatedDocument;
  }
}
