import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import * as reqUsrDto from './dto/req-user.dto';
import { Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 新增用户
  @Public()
  @Post('add')
  add(@Body() ReqAddUserDto: reqUsrDto.ReqAddUserDto) {
    return this.userService.add(ReqAddUserDto);
  }
}
