import { Injectable } from '@nestjs/common';
import {
  USER_TOKEN_KEY,
  USER_VERSION_KEY,
  CAPTCHA_IMG_KEY,
} from 'src/common/contants/redis.contant';
import { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { ApiException } from 'src/common/exceptions/api.exception';
import { UserService } from '../user/user.service';
import { SharedService } from 'src/shared/shared.service';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthService {
  @InjectRedis()
  private readonly redis: Redis;
  private readonly userService: UserService;
  private readonly sharedService: SharedService;

  // 验证token
  async validateToken(userId: number, pv: number, token: string) {
    //1.查询redis中的token和版本号
    const redisToken = await this.redis.get(`${USER_TOKEN_KEY}:${userId}`);
    const redisPv = parseInt(
      await this.redis.get(`${USER_VERSION_KEY}:${userId}`),
    );
    // 2.与传入的token,pv做比较
    if (redisToken !== token) throw new ApiException('token失效', 401);
    if (redisPv !== pv) throw new ApiException('用户信息已被修改', 401);
    return true;
  }

  // 验证账号密码是否正确
  async validateUser(username: string, password: string) {
    // 1.根据username查找出用户信息
    const user = await this.userService.findOneByUsername(username);
    // 2.与传入的password做比较
    if (!user) throw new ApiException('用户名或密码错误');
    const comparePassword = this.sharedService.md5(password + user.salt);
    if (comparePassword !== user.password)
      throw new ApiException('用户名或密码错误');
    return user;
  }

  /* 判断验证码是否正确 */
  async checkImgCaptcha(uuid: string, code: string) {
    const result = await this.redis.get(`${CAPTCHA_IMG_KEY}:${uuid}`);
    if (isEmpty(result) || code.toLowerCase() !== result.toLowerCase()) {
      throw new ApiException('验证码错误');
    }
    await this.redis.del(`${CAPTCHA_IMG_KEY}:${uuid}`);
  }
}
