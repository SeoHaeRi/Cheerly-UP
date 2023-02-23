import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { JwtStrategy } from './jwt.strategy';
import { KakaoStrategy } from './kakao.strategy';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

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
    TypeOrmModule.forFeature([User]),
    HttpModule,
    //이미지 multer
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtStrategy, KakaoStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
