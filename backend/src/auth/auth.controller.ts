import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './user.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: UserCredentialsDto) : Promise<UserResponseDto> {
        const register = await this.authService.register(dto);
        return {
            id: register.id,
            email: register.email,
            role: register.role,
            token: register.token
        }
    }

    @Post('login')
    async login(@Body() dto: UserCredentialsDto) : Promise<UserResponseDto> {
        const login = await this.authService.login(dto);
        return {
            id: login.user.id,
            email: login.user.email,
            role: login.user.role,
            token: login.token
        }
    }


    @Get('me')
    me(@User() user) {}
}
