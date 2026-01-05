import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'miClaveSuperSecreta',
      signOptions: { expiresIn: '1h'}
    }),
    UsersModule
  ],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
