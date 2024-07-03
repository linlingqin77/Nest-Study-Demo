import { Body, Controller, Post, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { ReqLoginDto } from './dto/req-login.dto';
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  async login(@Req() req: Request, @Body() body: ReqLoginDto) {
    return await this.loginService.login(req);
  }
}
