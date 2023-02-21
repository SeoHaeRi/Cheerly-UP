import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  userId: string;

  @IsString()
  content: string;

  @IsNumber()
  post_id: number;

  date: Date;
}
