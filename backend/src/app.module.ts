import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';


@Module({
  imports: [CharactersModule, AuthModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
