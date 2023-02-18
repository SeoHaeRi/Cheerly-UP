import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly id: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly pw: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  readonly nickname: string;
}
