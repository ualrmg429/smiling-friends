import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { MailModule } from 'src/mail/mail.module';
import { PendingRegistrationModule } from 'src/pending-registration/pending-registration.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'miClaveSuperSecreta',
      signOptions: { expiresIn: '1h'}
    }),
    UsersModule,
    MailModule,
    PendingRegistrationModule
  ],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
