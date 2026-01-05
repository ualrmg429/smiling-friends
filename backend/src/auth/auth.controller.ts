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
        const user = await this.authService.register(dto);
        return {
            id: user.id,
            email: user.email
        }
    }

    @Post('login')
    async login(@Body() dto: UserCredentialsDto) : Promise<UserResponseDto> {
        const user = await this.authService.login(dto);
        return {
            id: user.id,
            email: user.email
        }
    }


    @Get('me')
    me(@User() user) {}
}
