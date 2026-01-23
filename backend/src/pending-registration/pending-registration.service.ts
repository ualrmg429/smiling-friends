// pending-registration/pending-registration.service.ts
import { Injectable } from '@nestjs/common';
import { PendingRegistrationRepository } from './pending-registration.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PendingRegistrationService {
  constructor(private repository: PendingRegistrationRepository) {}

  async create(email: string, password: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 horas

    await this.repository.deleteByEmail(email);

    return this.repository.create({
      email,
      passwordHashed: hashedPassword,
      code,
      expiresAt,
    });
  }

  async findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  async refreshCode(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

    return this.repository.updateCode(email, code, expiresAt);
  }

  async delete(email: string) {
    return this.repository.delete(email);
  }
}