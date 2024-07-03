import { IsNotEmpty } from 'class-validator';
export class CreateEmailDto {
  @IsNotEmpty({ message: '发送邮箱不能为空' })
  email: string;
}
