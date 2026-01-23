// auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { PendingRegistrationService } from 'src/pending-registration/pending-registration.service';
import * as bcrypt from 'bcrypt';
import { PasswordResetService } from 'src/password-reset/password-reset.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    private pendingRegistrationService: PendingRegistrationService,
    private passwordResetService: PasswordResetService,
  ) {}

  async initiateRegistration(email: string, password: string) {  
    const existingUser = await this.usersService.getByEmail(email);
    
    if (existingUser) {
      throw new BadRequestException('This mail is already registered');
    }

    const pending = await this.pendingRegistrationService.create(email, password);
    await this.mailService.sendVerificationCode(email, pending.code);

    return { message: 'Code sent to your mail' };
  }

  async confirmRegistration(email: string, code: string) {
    const pending = await this.pendingRegistrationService.findByEmail(email);

    if (!pending) {
      throw new BadRequestException('There is not any registry of this mail');
    }

    if (pending.code !== code) {
      throw new BadRequestException('Incorrect code');
    }

    if (new Date() > pending.expiresAt) {
      throw new BadRequestException('Code has expired');
    }

    const user = await this.usersService.createUserWithHashedPassword({
      email: pending.email,
      passwordHashed: pending.passwordHashed,
    });

    await this.pendingRegistrationService.delete(email);
    await this.mailService.sendWelcome(email);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }

  async resendCode(email: string) {
    const pending = await this.pendingRegistrationService.findByEmail(email);

    if (!pending) {
      throw new BadRequestException('There is not pending code');
    }

    const updated = await this.pendingRegistrationService.refreshCode(email);
    await this.mailService.sendVerificationCode(email, updated.code);

    return { message: 'Code reenvied' };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.usersService.getByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHashed);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    return {
      user,
      token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }

  async requestPasswordReset(email: string) {
    const user = await this.usersService.getByEmail(email);
    
    if (!user) {
      return { message: 'If the email exists, a code has been sent' };
    }

    const reset = await this.passwordResetService.create(email);
    await this.mailService.sendPasswordResetCode(email, reset.code);

    return { message: 'If the email exists, a code has been sent' };
  }

  async confirmPasswordReset(email: string, code: string, newPassword: string) {
    const reset = await this.passwordResetService.findByEmail(email);

    if (!reset) {
      throw new BadRequestException('Invalid or expired code');
    }

    if (reset.code !== code) {
      throw new BadRequestException('Invalid code');
    }

    if (new Date() > reset.expiresAt) {
      throw new BadRequestException('Code has expired');
    }

    await this.usersService.updatePassword(email, newPassword);
    await this.passwordResetService.delete(email);

    return { message: 'Password reset successfully' };
  }
}