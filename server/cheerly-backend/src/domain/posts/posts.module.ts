import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/Post.entity';
import { UserModule } from '../user/user.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
