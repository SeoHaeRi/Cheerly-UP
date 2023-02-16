import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { PostsService } from './posts.service';

@Controller('board')
export class PostsController {
  constructor(private postsService: PostsService) {}

  //전체 게시글 불러오기
  @Get()
  async getPosts() {
    const posts = await this.postsService.getPosts();
    return posts;
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    //const {...postDetails, new } = createPostDto;
    //dto에 새로운 key 추가하면 가능

    return this.postsService.createPost(createPostDto);
  }

  //   @Put(':id')
  //   updatePostById(@Param('id', ParseIntPipe) id: number) {
  //     this.postsService.updatePost()
  //   }
}
