/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post } from '@nestjs/common';

@Controller()
export class LoginController {
  @Post()
  login() {
    return 'login';
  }
}
