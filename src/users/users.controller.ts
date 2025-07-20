import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

  @Post()
  createUser(@Body() request: CreateUserRequest) {
      console.log(request)
    return this.usersService.createUser(request);
  }
}