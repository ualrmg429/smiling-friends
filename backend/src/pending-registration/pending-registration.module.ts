import { Module } from '@nestjs/common';
import { PendingRegistrationService } from './pending-registration.service';
import { PendingRegistrationRepository } from './pending-registration.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PendingRegistrationService, PendingRegistrationRepository],
  exports: [PendingRegistrationService],
})
export class PendingRegistrationModule {}