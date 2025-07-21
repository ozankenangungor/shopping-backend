import { IsEmail, IsString, IsStrongPassword, MinLength } from 'class-validator'
export class CreateUserRequest {
    //@IsEmail()
    @IsString()
    email: string;
    
    //@IsStrongPassword()
    @IsString()
    password: string;
}