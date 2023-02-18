import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly id: string;
  @IsString()
  @IsNotEmpty()
  readonly pw: string;
}
