import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

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
