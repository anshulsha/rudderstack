import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Event } from './event.schema';

@Schema({ versionKey: '__v' }) // Enable versioning
export class TrackingPlan extends Document {
  @Prop({ required: true })
  display_name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: {
      events: [{ type: SchemaTypes.ObjectId, ref: 'Event' }],
    },
    default: { events: [] }, // Set a default empty array for events
  })
  rules: { events: string[] }; // Store the ObjectIds of referenced events
}

export const TrackingPlanSchema = SchemaFactory.createForClass(TrackingPlan);

// // Apply the `populate` method when querying for TrackingPlan documents
// TrackingPlanSchema.virtual('events', {
//   ref: 'Event', // Reference the Event model
//   localField: 'rules.events',
//   foreignField: '_id',
//   justOne: true, // Set this to `false` to populate an array of events
// });
