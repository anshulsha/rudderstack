import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import { Event, EventSchema } from './schemas/event.schema';
import {
  TrackingPlan,
  TrackingPlanSchema,
} from './schemas/tracking-plan.schema';

@Module({
  exports: [DatabaseService],
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/rudderstack`),
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: TrackingPlan.name, schema: TrackingPlanSchema },
    ]),
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class DatabaseModule {}
