import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ versionKey: '__v' }) // Enable versioning
export class TrackingPlan extends Document {
  @Prop({ required: true, unique: true })
  slug: string;
  
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
