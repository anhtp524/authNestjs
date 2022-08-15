import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../enum/role.enum";

export class CreatAccountDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string

    @IsArray()
    @IsNotEmpty()
    role: Role[]
}