import { IsEmail, IsStrongPassword, MinLength } from 'class-validator'
export class CreateUserRequest {
    //@IsEmail()
    @MinLength(1)
    email: string;
    
    //@IsStrongPassword()
    @MinLength(1)
    password: string;
}