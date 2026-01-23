// auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { PendingRegistrationService } from 'src/pending-registration/pending-registration.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    private pendingRegistrationService: PendingRegistrationService,
  ) {}

  async initiateRegistration(email: string, password: string) {
    const existingUser = await this.usersService.getByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Este correo ya está registrado');
    }

    const pending = await this.pendingRegistrationService.create(email, password);
    await this.mailService.sendVerificationCode(email, pending.code);

    return { message: 'Código enviado a tu correo' };
  }

  async confirmRegistration(email: string, code: string) {
    const pending = await this.pendingRegistrationService.findByEmail(email);

    if (!pending) {
      throw new BadRequestException('No hay registro pendiente para este correo');
    }

    if (pending.code !== code) {
      throw new BadRequestException('Código incorrecto');
    }

    if (new Date() > pending.expiresAt) {
      throw new BadRequestException('El código ha expirado');
    }

    const user = await this.usersService.createUser({
      email: pending.email,
      password: pending.passwordHashed,
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
}