import { IsEmail, IsNotEmpty, IsString } from "class-validator";

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
}