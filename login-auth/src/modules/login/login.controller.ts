import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { ReqLoginDto } from './dto/req-login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { DataObj } from 'src/common/class/data_obj.class';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request, @Body() body: ReqLoginDto) {
    return await this.loginService.login(req);
  }

  @Public()
  @Get('code')
  async getCode() {
    return await this.loginService.createImageCaptcha();
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
