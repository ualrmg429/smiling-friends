import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [CharactersModule, AuthModule, PrismaModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
