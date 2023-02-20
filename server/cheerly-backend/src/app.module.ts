import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from './domain/comment/comment.module';
import { PostsModule } from './domain/posts/posts.module';
import { ScrapperModule } from './domain/scrapper/scrapper.module';
import { StudyModule } from './domain/study/study.module';
import { UserModule } from './domain/user/user.module';
import { SocketModule } from './domain/socket/socket.module';
import { User } from './entities/User.entity';
import { Post } from './entities/Post.entity';
import { Comment } from './entities/Comment.entity';
import { Study } from './entities/Study.entity';
import { Chat } from './entities/Chat.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWD,
      database: process.env.DB_DATABASE,
      // entities: [__dirname + '/entities/*.entity.js'],
      entities: [User, Post, Comment, Study, Chat],
      logging: true,
    }),
    UserModule,
    ScrapperModule,
    PostsModule,
    StudyModule,
    CommentModule,
    SocketModule,
  ],
})
export class AppModule {}
