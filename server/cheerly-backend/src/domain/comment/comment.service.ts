import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/Comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentParams, UpdateCommentParams } from './utils/types';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  //GET - 전체 게시글 불러오기
  async getComments() {
    const comments = await this.commentRepository.find();
    return comments;
  }

  //GET - 특정한 postId에 맞는 댓글 가져오기
  async getCommentById(postId: string) {
    const commentData = await this.commentRepository
      .createQueryBuilder('c')
      .select([
        'c.comment_id',
        'c.post_id',
        'c.content',
        'c.date',
        'c.userId',
        'c.nickname',
      ])
      .where('c.post_id = :post_id', {
        post_id: Number(postId),
      })
      .getMany();

    return commentData;
  }

  //POST - 댓글 작성
  //user 정보는 req요청으로 가져와야함*****
  async createComment(postId: string, commentDetails: CreateCommentParams) {
    const newComment = await this.commentRepository.create({
      ...commentDetails,
      date: new Date(),
      post_id: Number(postId),
    });
    return this.commentRepository.save(newComment);
  }

  //PATCH - 댓글 수정
  async updateComment(
    postid: string,
    commentid: string,
    updateCommentDetails: UpdateCommentParams,
  ) {
    return await this.commentRepository.update(
      {
        post_id: Number(postid),
        comment_id: Number(commentid),
      },
      {
        ...updateCommentDetails,
        date: new Date(),
      },
    );
  }

  //DELETE - 댓글 삭제
  async deleteComment(postid: string, commentid: string) {
    return await this.commentRepository.delete({
      post_id: Number(postid),
      comment_id: Number(commentid),
    });
  }
}
