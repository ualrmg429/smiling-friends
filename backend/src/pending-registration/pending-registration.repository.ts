// pending-registration/pending-registration.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PendingRegistrationRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: { email: string; passwordHashed: string; code: string; expiresAt: Date }) {
    return this.prisma.pendingRegistration.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.pendingRegistration.findUnique({ where: { email } });
  }

  async updateCode(email: string, code: string, expiresAt: Date) {
    return this.prisma.pendingRegistration.update({
      where: { email },
      data: { code, expiresAt },
    });
  }

  async delete(email: string) {
    return this.prisma.pendingRegistration.delete({ where: { email } });
  }

  async deleteByEmail(email: string) {
    return this.prisma.pendingRegistration.deleteMany({ where: { email } });
  }
}