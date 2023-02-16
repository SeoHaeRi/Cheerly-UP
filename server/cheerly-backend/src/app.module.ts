import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'domain/user/user.module';
import { ScrapperModule } from 'domain/scrapper/scrapper.module';

import { Board } from './entities/Post.entity';
import { PostsModule } from 'domain/posts/posts.module';
import { User } from './entities/Study.entity';

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
      entities: [Board, User],
      synchronize: true,
    }),
    UserModule,
    ScrapperModule,
    PostsModule,
  ],
})
export class AppModule {}
