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
    console.log('Sending verification code to:', to);
    console.log('API Key exists:', !!process.env.RESEND_API_KEY);
    console.log('API Key:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');
    
    try {
      const result = await this.resend.emails.send({
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
      console.log('Email result:', result);
      return result;
    } catch (error) {
      console.error('Email error:', error);
      throw error;
    }
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

  async sendPasswordResetCode(to: string, code: string) {
    return this.resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject: 'Password Reset Code',
        html: `
            <h1>Reset your password</h1>
            <p>Your password reset code is:</p>
            <h2 style="letter-spacing: 5px; font-size: 32px;">${code}</h2>
            <p>This code expires in 15 minutes.</p>
            <p>If you didn't request this, ignore this email.</p>
        `,
    });
  }
}