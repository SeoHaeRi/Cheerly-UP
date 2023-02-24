import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/Post.entity';
import { JwtStrategy } from '../user/jwt.strategy';
import { UserRepository } from '../user/user.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'SecretCheer123',
      signOptions: {
        expiresIn: 60 * 60 * 6, // 6시간 유효
      },
    }),
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [PostsController],
  providers: [PostsService, JwtStrategy, UserRepository],
  exports: [JwtStrategy, PassportModule],
})
export class PostsModule {}
