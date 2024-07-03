import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from 'src/common/exceptions/api.exception';
import { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import {
  USER_TOKEN_KEY,
  USER_EMAIL_KEY,
} from 'src/common/contants/redis.contant';
import { DataObj } from 'src/common/class/data_obj.class';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRedis()
  private readonly redis: Redis;
  async emailLogin({ email, code }: CreateUserDto) {
    const user = await this.validateEmail(email);
    await this.validateEmailCode(email, code);
    // ...登录成功
    return DataObj.create(user);
  }
  //检验email
  async validateEmail(email: string) {
    console.log(email, 'email');

    const isExist = await this.userRepository.findOneBy({ email });
    if (!isExist) throw new ApiException('登录邮箱不存在');
    return isExist;
  }
  async validateToken(userId: number, pv: number, restoken: string) {
    const token = await this.redis.get(`${USER_TOKEN_KEY}:${userId}`);
    if (!token || token !== restoken) throw new ApiException('token失效');
    return true;
  }
  async validateEmailCode(email: string, code: string) {
    const emailCode = await this.redis.get(`${USER_EMAIL_KEY}:${code}`);
    if (!emailCode || emailCode !== code) throw new ApiException('验证码错误');
    return true;
  }
}
