// password-reset/password-reset.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PasswordResetRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: { email: string; code: string; expiresAt: Date }) {
    return this.prisma.passwordReset.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.passwordReset.findUnique({ where: { email } });
  }

  async update(email: string, data: { code: string; expiresAt: Date }) {
    return this.prisma.passwordReset.update({
      where: { email },
      data,
    });
  }

  async delete(email: string) {
    return this.prisma.passwordReset.delete({ where: { email } });
  }

  async deleteByEmail(email: string) {
    return this.prisma.passwordReset.deleteMany({ where: { email } });
  }
}