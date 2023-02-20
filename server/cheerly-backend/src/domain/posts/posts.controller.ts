import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { UpdatePostDto } from './dtos/UpdatePost.dto';
import { PostsService } from './posts.service';

@Controller('board')
export class PostsController {
  constructor(private postsService: PostsService) {}

  //GET - 전체 게시글 불러오기
  @Get()
  async getPosts(@Req() req, @Res() res) {
    const posts = await this.postsService.getPosts();
    res.send(posts);
    return posts;
  }

  //Get - 특정 게시글
  @Get('/:id')
  async getOne(@Param('id') postId: string, @Req() req, @Res() res) {
    const param = postId.slice(1);
    console.log(param);

    const post = await this.postsService.getOne(param);
    res.send(post);
    return post;
  }

  //POST - 게시글 생성
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    //const {...postDetails, new } = createPostDto;
    //dto에 새로운 key 추가하면 가능
    const newPost = await this.postsService.createPost(createPostDto);
    return newPost;
  }

  //Patch - 게시글 수정 :id -> 게시글 번호
  @Patch('edit/:id')
  async updatePostById(
    @Param('id', ParseIntPipe) postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const editPost = await this.postsService.updatePost(postId, updatePostDto);
    console.log(editPost);
    return editPost;
  }

  @Delete('/:id')
  async deletePostById(@Param('id', ParseIntPipe) postId: number) {
    await this.postsService.deletePost(postId);
  }
}
