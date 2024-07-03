import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { ReqLoginDto } from './dto/req-login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { DataObj } from 'src/common/class/data_obj.class';
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  async login(@Req() req: Request, @Body() body: ReqLoginDto) {
    return await this.loginService.login(req);
  }
  @Public()
  @Get('text1')
  tex1() {
    return DataObj.create('text1');
  }
  @Get('text2')
  tex2() {
    return DataObj.create('text2');
  }
}
