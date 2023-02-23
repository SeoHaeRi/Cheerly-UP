import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  id: string;
  @IsString()
  pw: string;
  @IsString()
  nickname: string;
}
