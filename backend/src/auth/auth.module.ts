import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'miClaveSuperSecreta',
      signOptions: { expiresIn: '1h'}
    }),
  ],
  providers: [JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
