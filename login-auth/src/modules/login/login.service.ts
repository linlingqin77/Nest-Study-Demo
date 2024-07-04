import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import { SharedService } from 'src/shared/shared.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import {
  CAPTCHA_IMG_KEY,
  USER_TOKEN_KEY,
  USER_VERSION_KEY,
} from 'src/common/contants/redis.contant';
import { Payload } from './login.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class LoginService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    private readonly sharedService: SharedService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /* 登录 */
  async login(request: Request) {
    const { user } = request as any;
    const payload: Payload = { userId: user.userId, pv: 1 };
    //生成token
    let jwtSign = this.jwtService.sign(payload);
    //演示环境 复用 token，取消单点登录。
    if (this.configService.get<boolean>('isDemoEnvironment')) {
      const token = await this.redis.get(`${USER_TOKEN_KEY}:${user.userId}`);
      if (token) {
        jwtSign = token;
      }
    }
    //存储密码版本号，防止登录期间 密码被管理员更改后 还能继续登录
    await this.redis.set(`${USER_VERSION_KEY}:${user.userId}`, 1);
    //存储token, 防止重复登录问题，设置token过期时间(1天后 token 自动过期)，以及主动注销token。
    await this.redis.set(
      `${USER_TOKEN_KEY}:${user.userId}`,
      jwtSign,
      'EX',
      60 * 60 * 24,
    );
    // //调用存储在线用户接口
    // await this.logService.addLogininfor(
    //   request,
    //   '登录成功',
    //   `${USER_TOKEN_KEY}:${user.userId}`,
    // );
    return { token: jwtSign };
  }

  /* 创建验证码图片 */
  async createImageCaptcha() {
    const { data, text } = svgCaptcha.createMathExpr({
      // size: 4, //验证码长度
      // ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 3, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      // background: '#cc9966', // 验证码图片背景颜色
      width: 115.5,
      height: 38,
    });
    const svgBuffer = Buffer.from(data).toString('base64');
    const result = {
      img: svgBuffer,
      uuid: this.sharedService.generateUUID(),
    };
    console.log(text, 'text');

    await this.redis.set(
      `${CAPTCHA_IMG_KEY}:${result.uuid}`,
      text,
      'EX',
      60 * 5,
    );
    return result;
  }
}
