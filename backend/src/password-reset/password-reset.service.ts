// password-reset/password-reset.service.ts
import { Injectable } from '@nestjs/common';
import { PasswordResetRepository } from './password-reset.repository';

@Injectable()
export class PasswordResetService {
  constructor(private repository: PasswordResetRepository) {}

  async create(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await this.repository.deleteByEmail(email);

    const reset = await this.repository.create({
      email,
      code,
      expiresAt,
    });

    return reset;
  }

  async findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  async refreshCode(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    return this.repository.update(email, { code, expiresAt });
  }

  async delete(email: string) {
    return this.repository.delete(email);
  }
}