import { IsNotEmpty } from 'class-validator';
export class EmailLoginDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  code: string;
}
