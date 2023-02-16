import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entities/Post.entity';
import { User } from 'src/entities/User.entity';
import { CreateDateColumn, DataSource, Repository } from 'typeorm';
import { CreatePostDto } from './dtos/CreatePost.dto';

import { CreatePostParams } from './utils/types';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  //전체 게시글 불러오기
  async getPosts() {
    return await this.boardRepository.find();
  }

  //   createPost(postDetails: CreatePostParams) {
  //     // const newPost = this.boardRepository.create({
  //     //   ...postDetails,
  //     //   date: new Date(),
  //     // });

  //     const newPost = this.boardRepository.insert(Object.assign(CreatePostDto, {}))
  //     return this.boardRepository.save(newPost);
  //   }
}
