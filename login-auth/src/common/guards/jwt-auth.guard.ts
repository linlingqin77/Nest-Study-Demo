import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../contants/decorator.contant';
import { AuthGuard } from '@nestjs/passport';
import { ApiException } from '../exceptions/api.exception';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // getHandler 值将覆盖 getClass上面的值
    // this.reflector.getAllAndMerge
    const noInterception = this.reflector.getAllAndOverride(PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (noInterception) return true;
    return super.canActivate(context);
  }

  /* 主动处理错误 */
  handleRequest(err, user, info) {
    console.log(err, 'err');

    if (err || !user) {
      throw err || new ApiException('登录状态已过期', 401);
    }
    return user;
  }
}
