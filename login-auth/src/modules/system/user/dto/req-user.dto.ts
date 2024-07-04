import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

/* 新增用户 */
export class ReqAddUserDto extends OmitType(User, ['userId'] as const) {}
