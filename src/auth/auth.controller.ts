import { CurrentUser } from './current-user.decorator';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    
    constructor(
        private readonly authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(
        @CurrentUser() user: User,
        @Res({ passthrough: true }) response: Response) {
        return this.authService.login(user, response)
    }
}
