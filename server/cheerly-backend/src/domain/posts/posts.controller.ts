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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { UpdatePostDto } from './dtos/UpdatePost.dto';
import { PostsService } from './posts.service';
import { diskStorage } from 'multer';
// import { multerOptions } from '../../../lib/multerOptions';

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

  //Get - 특정 게시글 id
  @Get('/:id')
  async getOne(@Param('id') postId: string, @Req() req, @Res() res) {
    const param = postId.slice(1);
    console.log(param);

    const post = await this.postsService.getOne(param);

    res.send(post);
    return post;
  }

  //Get - 특정 유저 id
  @Get('mypost/:id')
  async getMany(@Param('id') userId: string, @Req() req, @Res() res) {
    const post = await this.postsService.getMany(userId);

    res.send(post);
    return post;
  }

  //POST - 게시글 생성
  @Post('/write')
  async createPost(@Body() createPostDto: CreatePostDto) {
    //const {...postDetails, new } = createPostDto;
    //dto에 새로운 key 추가하면 가능
    const newPost = await this.postsService.createPost(createPostDto);
    return newPost;
  }

  //Patch - 게시글 수정 :id -> 게시글 번호
  @Patch('/:id')
  async updatePostById(
    @Param('id') postId: string,
    // @Param('id', ParseIntPipe) postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const param = postId.slice(1);
    console.log(param);

    const editPost = await this.postsService.updatePost(param, updatePostDto);
    console.log(editPost);
    return editPost;
  }

  @Delete('/:id')
  async deletePostById(@Param('id') postId: string) {
    const param = postId.slice(1);
    console.log(param);

    await this.postsService.deletePost(param);
  }

  // @Post('/upload')
  // @UseInterceptors(FilesInterceptor('file', null, multerOptions))
  // async uploadFile(@UploadedFiles() file) {
  //   // await this.postsService.uploadImg(file)
  //   console.log(file[0].filename);
  // }
}
