import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ versionKey: '__v' }) // Enable versioning
export class Event extends Document {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  display_name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: SchemaTypes.Mixed })
  rules: any;
}

export const EventSchema = SchemaFactory.createForClass(Event);
