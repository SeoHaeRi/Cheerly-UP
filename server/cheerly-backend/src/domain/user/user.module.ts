import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
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
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
