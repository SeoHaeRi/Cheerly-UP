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

  @Get()
  getPosts() {
    // return this.postsService.getPosts();
  }

  //   @Post()
  //   createPost(@Body() createPostDto: CreatePostDto) {
  //     //const {...postDetails, new } = createPostDto;
  //     //dto에 새로운 key 추가하면 가능

  //     return this.postsService.createPost(createPostDto);
  //   }

  //   @Put(':id')
  //   updatePostById(@Param('id', ParseIntPipe) id: number) {
  //     this.postsService.updatePost()
  //   }
}
