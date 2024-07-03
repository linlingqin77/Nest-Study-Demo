import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { USER_EMAIL_KEY } from 'src/common/contants/redis.contant';
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @InjectRedis()
  private readonly redis: Redis;

  @Get('code')
  sendEmailCode(@Query() Query: CreateEmailDto) {
    const code = Math.random().toString().slice(2, 6);
    this.redis.set(`${USER_EMAIL_KEY}:${code}`, code, 'EX', 60 * 5);
    return this.emailService.sendEmailCode({
      to: Query.email,
      subject: '登录验证码',
      html: `<p>您的登录验证码是${code}</p>`,
    });
  }
}
