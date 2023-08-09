import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class TrackingPlan extends Document {
  @Prop({ required: true })
  display_name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'Event' }],
  })
  rules: {
    events: string[]; // Store the ObjectIds of referenced events
  };
}

export const TrackingPlanSchema = SchemaFactory.createForClass(TrackingPlan);

TrackingPlanSchema.pre('findOneAndUpdate', function () {
  // Increment the __v field by 1
  this.updateOne({}, { $inc: { __v: 1 } });
});
