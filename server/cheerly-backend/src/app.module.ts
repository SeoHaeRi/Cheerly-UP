import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'domain/user/user.module';
import { ScrapperModule } from 'domain/scrapper/scrapper.module';

import { PostsModule } from 'domain/posts/posts.module';

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
      entities: ['entities/*.js'],
      synchronize: true,
    }),
    UserModule,
    ScrapperModule,
    PostsModule,
  ],
})
export class AppModule {}
