import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Event extends Document {

  @Prop()
  @Field(() => String, { description: 'Example field (placeholder)' })
  title: string;
}

export const EventSchema = SchemaFactory.createForClass( Event );