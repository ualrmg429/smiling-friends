import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { StorageService } from './storage/storage.service';
import { StorageModule } from './storage/storage.module';


@Module({
  imports: [CharactersModule, AuthModule, PrismaModule, UsersModule, StorageModule],
  controllers: [],
  providers: [PrismaService, StorageService],
})
export class AppModule {}
