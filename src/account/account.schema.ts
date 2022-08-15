import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "./enum/role.enum";

export type AccountDocument = Account & Document

@Schema()
export class Account {
    @Prop()
    username: string

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    role: Role[]
}

export const AccountSchema = SchemaFactory.createForClass(Account)