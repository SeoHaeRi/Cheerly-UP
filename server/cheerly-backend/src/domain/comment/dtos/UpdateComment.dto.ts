import { IsDate, IsString } from 'class-validator';
export class UpdateCommentDto {
  @IsString()
  content: string;

  date: Date;
}
