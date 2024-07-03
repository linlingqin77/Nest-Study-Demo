import { Injectable } from '@nestjs/common';
import { createTransport, transporter } from 'nodemailer';
import { DataObj } from 'src/common/class/data_obj.class';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EmailService {
  private transporter: transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get('EMAIL_ADDRESS'),
        pass: this.configService.get('EMAIL_AUTH_CODE'),
      },
    });
  }
  async sendEmailCode({ to, subject, html }) {
    const res = await this.transporter.sendMail({
      from: {
        name: '系统邮件',
        address: this.configService.get('EMAIL_ADDRESS'),
      },
      to,
      subject,
      html,
    });
    return DataObj.create(res);
  }
}
