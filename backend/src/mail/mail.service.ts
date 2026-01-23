// mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendVerificationCode(to: string, code: string) {
    return this.resend.emails.send({
      from: 'onboarding@resend.dev', 
      to,
      subject: 'Verification Code',
      html: `
        <h1>Verify your account</h1>
        <p>Your verification code is:</p>
        <h2 style="letter-spacing: 5px; font-size: 32px;">${code}</h2>
        <p>This code expires in 2 hours.</p>
      `,
    });
  }

  async sendWelcome(to: string) {
    return this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject: 'Welcome!',
      html: `
        <h1>Welcome to Smiling Friends!</h1>
        <p>Your account has been verified successfully.</p>
      `,
    });
  }
}