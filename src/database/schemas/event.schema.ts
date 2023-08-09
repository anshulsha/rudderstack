import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: SchemaTypes.Mixed })
  rules: any;
}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.pre('findOneAndUpdate', function () {
  // Increment the __v field by 1
  this.updateOne({}, { $inc: { __v: 1 } });
});
