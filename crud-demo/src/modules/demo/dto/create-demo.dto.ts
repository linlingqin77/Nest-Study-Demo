import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateDemoDto {
  @IsString()
  @IsNotEmpty({ message: '名字不能为空' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: '年龄不能为空' })
  age: number;
}
