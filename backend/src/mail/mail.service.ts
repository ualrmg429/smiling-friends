import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendVerificationCode(to: string, code: string) {
    return this.transporter.sendMail({
      from: '"Tu App" <noreply@tuapp.com>',
      to,
      subject: 'Código de verificación',
      html: `
        <h1>Verifica tu cuenta</h1>
        <p>Tu código de verificación es:</p>
        <h2 style="letter-spacing: 5px; font-size: 32px;">${code}</h2>
        <p>Este código expira en 15 minutos.</p>
      `,
    });
  }

  async sendWelcome(to: string) {
    return this.transporter.sendMail({
      from: '"Smiling Characters" <noreply@smilingcharacters.com>',
      to,
      subject: 'Welcome!',
      html: `
        <h1>¡Hola!</h1>
        <p>Your account was verified correctly.</p>
      `,
    });
  }
}