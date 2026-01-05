import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './user.decorator';

@Controller('auth')
export class AuthController {
    @Post('register')
    register(@Body() dto: UserCredentialsDto) {
        return 'Created User'
    }

    @Post('login')
    login(@Body() dto: UserCredentialsDto) {
        return 'User'
    }


    @Get('me')
    me(@User() user) {}
}
