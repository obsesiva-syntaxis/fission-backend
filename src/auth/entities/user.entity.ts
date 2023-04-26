import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ unique: true })
    username: string;

    @Prop({ type: String })
    avatarUrl: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [String], default: ['admin']})
    roles: string[];

    @Prop({ type: Date, default: new Date()})
    createdAt: Date;

    @Prop({ type: Date })
    modifiedAt: Date;

    @Prop({ type: Date })
    deletedAt: Date;
}


export const UserSchema = SchemaFactory.createForClass( User );