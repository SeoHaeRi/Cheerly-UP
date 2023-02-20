import { IsString } from 'class-validator';
export class UpdatePostDto {
  @IsString()
  userId: string;
  @IsString()
  title: string;
  @IsString()
  content: string;
}
