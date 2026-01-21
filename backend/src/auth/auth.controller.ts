import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './user.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse, ApiCreatedResponse, 
         ApiBadRequestResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // -----------------------------------------
    // REGISTER USER
    // -----------------------------------------
    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: UserCredentialsDto, description: 'User credentials for registration' })
    @ApiCreatedResponse({ description: 'User registered successfully', type: UserResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid data provided or user already exists' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async register(@Body() dto: UserCredentialsDto) : Promise<UserResponseDto> {
        const register = await this.authService.register(dto);
        return {
            id: register.id,
            email: register.email,
            role: register.role,
            token: register.token
        }
    }

    // -----------------------------------------
    // LOGIN USER
    // -----------------------------------------
    @Post('login')
    @ApiOperation({ summary: 'Login with user credentials' })
    @ApiBody({ type: UserCredentialsDto, description: 'User credentials for authentication' })
    @ApiOkResponse({ description: 'User logged in successfully', type: UserResponseDto })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiBadRequestResponse({ description: 'Invalid data provided' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async login(@Body() dto: UserCredentialsDto) : Promise<UserResponseDto> {
        const login = await this.authService.login(dto);
        return {
            id: login.user.id,
            email: login.user.email,
            role: login.user.role,
            token: login.token
        }
    }

    // -----------------------------------------
    // GET CURRENT USER
    // -----------------------------------------
    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get current authenticated user information' })
    @ApiOkResponse({ description: 'User information retrieved successfully', type: UserResponseDto })
    @ApiUnauthorizedResponse({ description: 'Not authenticated or invalid token' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    me(@User() user) {
        return user;
    }
}