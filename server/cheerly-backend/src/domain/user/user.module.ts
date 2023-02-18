import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

// @Module({
//   imports: [
//     // TypeOrmModule.forFeature([User]),
//     TypeOrmExModule.forCustomRepository([UserRepository]),
//   ],
//   controllers: [UserController],
//   providers: [UserService],
// })
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
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
