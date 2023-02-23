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
import { SocketGateway } from './domain/socket/socket.gateway';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { LifeModule } from './domain/life/life.module';
import { Life } from './entities/Life.entity';
import { MulterModule } from '@nestjs/platform-express';

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
      entities: [User, Post, Comment, Study, Chat, Life],
      logging: true,
    }),
    MulterModule.register({
      dest: './upload',
    }),
    UserModule,
    ScrapperModule,
    PostsModule,
    StudyModule,
    CommentModule,
    SocketModule,
    LifeModule,
  ],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
