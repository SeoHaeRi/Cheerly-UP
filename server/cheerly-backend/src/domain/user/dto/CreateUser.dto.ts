import { IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly pw: string;
  @IsString()
  readonly nickname: string;
}
