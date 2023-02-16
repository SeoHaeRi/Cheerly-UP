import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'domain/posts/posts.module';
import { ScrapperModule } from 'domain/scrapper/scrapper.module';
import { UserModule } from 'domain/user/user.module';
import { Board } from './entities/Post.entity';

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
      entities: [__dirname + '/entities/*.entity.js'],
      logging: true,
    }),
    UserModule,
    ScrapperModule,
    PostsModule,
  ],
})
export class AppModule {}
