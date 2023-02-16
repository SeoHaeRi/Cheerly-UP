import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/entities/Post.entity';
import { User } from 'src/entities/User.entity';
import { UserService } from '../user/user.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
