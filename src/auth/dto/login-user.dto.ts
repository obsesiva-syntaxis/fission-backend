import { IsString, MinLength } from "class-validator";

export class LoginUserDTO {
    @IsString() @MinLength(1)
    email: string;

    @IsString() @MinLength(1)
    password: string;
}