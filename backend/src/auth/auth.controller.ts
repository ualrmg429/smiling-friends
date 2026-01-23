import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './user.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InitiateRegistrationDto } from './dto/initiate-registration.dto';
import { ConfirmRegistrationDto } from './dto/confirm-registration.dto';
import { ResendCodeDto } from './dto/resend-code.dto';
import { MessageResponseDto } from './dto/message-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // -----------------------------------------
  // INITIATE REGISTRATION
  // -----------------------------------------
  @Post('register')
  @ApiOperation({ summary: 'Initiate user registration', description: 'Sends a verification code to the provided email address' })
  @ApiBody({ type: InitiateRegistrationDto })
  @ApiCreatedResponse({ description: 'Verification code sent successfully', type: MessageResponseDto })
  @ApiBadRequestResponse({ description: 'Email already registered or invalid data' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  initiateRegistration(@Body() body: InitiateRegistrationDto): Promise<MessageResponseDto> {
    return this.authService.initiateRegistration(body.email, body.password);
  }

  // -----------------------------------------
  // CONFIRM REGISTRATION
  // -----------------------------------------
  @Post('register/confirm')
  @ApiOperation({ summary: 'Confirm registration with verification code', description: 'Validates the code and creates the user account' })
  @ApiBody({ type: ConfirmRegistrationDto })
  @ApiCreatedResponse({ description: 'User registered successfully', type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid or expired code' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  confirmRegistration(@Body() body: ConfirmRegistrationDto): Promise<UserResponseDto> {
    return this.authService.confirmRegistration(body.email, body.code);
  }

  // -----------------------------------------
  // RESEND VERIFICATION CODE
  // -----------------------------------------
  @Post('register/resend')
  @ApiOperation({ summary: 'Resend verification code', description: 'Sends a new verification code to the email with a pending registration' })
  @ApiBody({ type: ResendCodeDto })
  @ApiOkResponse({ description: 'Verification code resent successfully', type: MessageResponseDto })
  @ApiBadRequestResponse({ description: 'No pending registration found for this email' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  resendCode(@Body() body: ResendCodeDto): Promise<MessageResponseDto> {
    return this.authService.resendCode(body.email);
  }

  // -----------------------------------------
  // LOGIN USER
  // -----------------------------------------
  @Post('login')
  @ApiOperation({ summary: 'Login with user credentials' })
  @ApiBody({ type: UserCredentialsDto })
  @ApiOkResponse({ description: 'User logged in successfully', type: UserResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async login(@Body() dto: UserCredentialsDto): Promise<UserResponseDto> {
    const login = await this.authService.login(dto);
    return {
      id: login.user.id,
      email: login.user.email,
      role: login.user.role,
      token: login.token,
    };
  }

  // -----------------------------------------
  // GET CURRENT USER
  // -----------------------------------------
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user information' })
  @ApiOkResponse({ description: 'User information retrieved successfully', type: UserResponseDto })
  @ApiUnauthorizedResponse({ description: 'Not authenticated or invalid token' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  me(@User() user) {
    return user;
  }
}