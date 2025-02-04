import { IsEmail, IsNumber, IsString } from "class-validator";

export class signUpDTO {

    @IsString()
    name: string

    @IsString()
    password: string;

    @IsString()
    new_password: string;

    @IsEmail()
    email: string;
}

export class signInDTO {


    @IsEmail()
    email: string;

    @IsString()
    password: string;



}