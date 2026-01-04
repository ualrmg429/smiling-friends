import { Body, Controller, Post } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserResponseDto } from './dto/user-response.dto';

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

    
}
