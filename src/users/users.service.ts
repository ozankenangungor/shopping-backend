import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    
    createUser(data: CreateUserRequest) {
    console.log(data)
    }
}
