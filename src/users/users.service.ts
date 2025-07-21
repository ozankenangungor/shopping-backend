import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { CreatedUserResponse } from 'src/interfaces/created-user-response.interface';
@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}
    
    async createUser(data: CreateUserRequest): Promise<CreatedUserResponse> {
       try {
           return this.prismaService.user.create({
               data: {
                   ...data,
                   password: await bcrypt.hash(data.password, 10),
                   
               },
               select: {
                   email: true,
                   id: true,
               }
           });
       } catch (error) {
           if (error.code === 'P2002') {
            throw new UnprocessableEntityException('Email already exists.')
           }   
           throw error;
       }
    }

    async getUser(filter: Prisma.UserWhereUniqueInput) {
        return this.prismaService.user.findUniqueOrThrow({
            where: filter
        })
    }
}
