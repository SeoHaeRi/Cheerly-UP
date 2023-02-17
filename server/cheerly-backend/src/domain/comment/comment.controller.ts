import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/CreateComment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  //GET - 특정 post_id에 맞는 댓글 가져오기
  @Get('/:postId')
  async getCommentById(
    @Param('postId') postId: number,
    @Req() req,
    @Res() res,
  ) {
    const commentDatabyPostId = await this.commentService.getCommentById(
      postId,
    );
    return commentDatabyPostId;
  }

  //POST - 댓글 생성(특정 post_id에 댓글 생성
  //+ 댓글을 쓰는 유저 정보 userId 가져와야함*****)
  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    const newComment = await this.commentService.createComment(
      createCommentDto,
    );

    console.log('new!!!', newComment);
    return newComment;
  }

  //UPDATE - 댓글 수정(content -> date도 수정)
  //DELTE - 댓글 삭제
}
