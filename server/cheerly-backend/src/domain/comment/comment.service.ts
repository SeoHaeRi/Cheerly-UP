import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/Comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentParams } from './utils/types';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  //GET - 특정한 postId에 맞는 댓글 가져오기
  async getCommentById(postId: number) {
    const commentData = await this.commentRepository
      .createQueryBuilder('c')
      .select(['c.comment_id', 'c.post_id', 'c.content', 'c.date', 'c.userId'])
      .where('c.post_id = :post_id', {
        post_id: postId,
      })
      .getMany();

    console.log(commentData);
    return commentData;
  }

  //POST - 댓글 작성
  //user 정보는 req요청으로 가져와야함*****
  async createComment(commentDetails: CreateCommentParams) {
    const newComment = await this.commentRepository.create({
      ...commentDetails,
      date: new Date(),
    });
    return this.commentRepository.save(newComment);
  }
}
