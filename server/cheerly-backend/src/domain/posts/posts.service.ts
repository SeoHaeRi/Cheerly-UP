import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'querystring';
import { Post } from 'src/entities/Post.entity';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/CreatePost.dto';

import { CreatePostParams, UpdatePostParams } from './utils/types';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private boardRepository: Repository<Post>,
  ) {}

  //GET - 전체 게시글 불러오기
  async getPosts() {
    const posts = await this.boardRepository.find();
    return posts;
  }

  //Get :id  - 특정 게시글
  async getOne(postId: string) {
    const post = await this.boardRepository
      .createQueryBuilder('p')
      .select(['p.post_id', 'p.title', 'p.content', 'p.date', 'p.userId'])
      .where('p.post_id = :post_id', {
        post_id: Number(postId),
      })
      .getOne();

    if (!post) throw new NotFoundException(`Can't find post with id ${postId}`);

    console.log(post);
    return post;
  }

  //Get :userid  - 특정 게시글
  async getMany(userId: string) {
    const postbyUser = await this.boardRepository
      .createQueryBuilder('p')
      .select(['p.post_id', 'p.title', 'p.content', 'p.date', 'p.userId'])
      .where('p.userId = :userId', {
        userId: String(userId),
      })
      .getMany();

    if (!postbyUser)
      throw new NotFoundException(`Can't find post with id ${userId}`);

    console.log(postbyUser);
    return postbyUser;
  }

  //POST - 게시글 생성
  async createPost(postDetails: CreatePostParams) {
    const newPost = await this.boardRepository.create({
      ...postDetails,
      date: new Date(),
    });
    return this.boardRepository.save(newPost);
  }

  //PATCH - 게시글 수정
  async updatePost(id: string, updatePostDetails: UpdatePostParams) {
    return await this.boardRepository.update(
      { post_id: Number(id) },
      { ...updatePostDetails, date: new Date() },
    );
  }

  //DELETE - 게시글 삭제
  async deletePost(id: string) {
    return await this.boardRepository.delete({ post_id: Number(id) });
  }

  // //POST - 게시판 이미지
  // uploadFiles(file: Express.Multer.File) {
  //   return res;
  // }

  // async uploadImg(filename: string) {
  //   const newImg = await this.boardRepository.create({
  //     ...postDetails,
  //     date: new Date(),
  //     img: filename
  //   });
  //   // const newPost = this.boardRepository.insert(
  //   //   Object.assign(CreatePostDto, {}),
  //   // );
  //   return this.boardRepository.save(newPost);
}
