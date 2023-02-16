import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entities/Post.entity';
import { CreateDateColumn, Repository } from 'typeorm';
import { CreatePostDto } from './dtos/CreatePost.dto';

import { CreatePostParams } from './utils/types';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  getPosts() {
    return this.boardRepository.find();
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
