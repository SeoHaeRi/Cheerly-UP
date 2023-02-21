import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/CreateComment.dto';
import { UpdateCommentDto } from './dtos/UpdateComment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  async getPosts(@Req() req, @Res() res) {
    const comments = await this.commentService.getComments();
    res.send(comments);
    console.log(comments);
    return comments;
  }

  // //GET - 특정 post_id에 맞는 댓글 가져오기
  @Get('/:id')
  async getCommentById(@Param('id') postId: string, @Req() req, @Res() res) {
    const param = postId.slice(1);
    console.log(param);

    const commentDatabyPostId = await this.commentService.getCommentById(param);
    console.log(commentDatabyPostId);

    res.send(commentDatabyPostId);
    return commentDatabyPostId;
  }

  //POST - 댓글 생성(특정 post_id에 댓글 생성
  //+ 댓글을 쓰는 유저 정보 userId 가져와야함*****)
  @Post('/:id')
  async createComment(
    @Param('id') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const paramPostId = postId.slice(1);
    const newComment = await this.commentService.createComment(
      paramPostId,
      createCommentDto,
    );
    return newComment;
  }

  //PATCH - 댓글 수정: 2개의 조건 (content -> date도 수정)
  @Patch('/:id/:cd')
  async updateCommentById(
    @Param('id') postId: string,
    @Param('cd') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const paramPostId = postId.slice(1);
    const paramCommentId = commentId.slice(1);

    const editComment = await this.commentService.updateComment(
      paramPostId,
      paramCommentId,
      updateCommentDto,
    );
    console.log(editComment);
    return editComment;
  }

  //DELETE - 댓글 삭제 : 2개의 조건
  @Delete('/:id/:cd')
  async deletePostById(
    @Param('id') postId: string,
    @Param('cd') commentId: string,
  ) {
    const paramPostId = postId.slice(1);
    const paramCommentId = commentId.slice(1);

    const deleteComment = await this.commentService.deleteComment(
      paramPostId,
      paramCommentId,
    );
    return deleteComment;
  }
}
