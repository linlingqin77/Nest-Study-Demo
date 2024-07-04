import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as reqUsrDto from './dto/req-user.dto';
import { DataObj } from 'src/common/class/data_obj.class';
import { SharedService } from 'src/shared/shared.service';
@Injectable()
export class UserService {
  constructor(
    private readonly sharedService: SharedService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async add(ReqAddUserDto: reqUsrDto.ReqAddUserDto) {
    const newUser = this.userRepository.create();
    newUser.userName = ReqAddUserDto.userName;
    newUser.nickName = ReqAddUserDto.nickName;
    newUser.password = ReqAddUserDto.password;
    newUser.sex = ReqAddUserDto.sex;
    newUser.status = ReqAddUserDto.status;
    newUser.salt = this.sharedService.generateUUID();
    return DataObj.create(await this.userRepository.save(newUser));
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('user.userId')
      .addSelect('user.userName')
      .addSelect('user.password')
      .addSelect('user.salt')
      .where({
        userName: username,
        delFlag: '0',
        status: '0',
      })
      .getOne();

    return user;
  }
}
