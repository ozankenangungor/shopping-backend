import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client';
import ms from 'ms';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) { }

    async login(user: User, response: Response) {
        const expires = new Date(Date.now() + ms(this.configService.getOrThrow('JWT_EXPIRATION')));
        
        const tokenPayload: TokenPayload = {
            userId: user.id,
        };

        const token = this.jwtService.sign(tokenPayload);

        response.cookie('Authentication', token, {
            secure: true,
            httpOnly: true,
            expires
        });

        return { token };
    }
    
    async verifyUser(email: string, password: string) {
        try {
            const user = await this.usersService.getUser({ email });
            const authenticated = await bcrypt.compare(password, user.password);
            if (!authenticated) throw new UnauthorizedException();
            return user;
        } catch (error) {
            throw new UnauthorizedException('Credentials are not valid.')
        }
    }

}
