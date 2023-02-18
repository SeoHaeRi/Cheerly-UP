import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';

// @CustomRepository(User)
// export class UserRepository extends Repository<User> {
//   async createUser(userData: CreateUserDto): Promise<void> {
//     const { id, pw, nickname } = userData;
//     const user = this.create({ id, pw, nickname });

//     try {
//       const user = this.create({ id, pw, nickname });
//       await this.save(user);
//     } catch (error) {
//       console.log(error.code);

//       throw new ConflictException('존재하는 유저입니다');
//     }
//     await this.save(user);
//   }
// }

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(userData: CreateUserDto): Promise<void> {
    const { id, pw, nickname } = userData;
    const isExist = await this.find({
      select: ['id', 'nickname'],
      where: [{ id: id }, { nickname: nickname }],
    });

    console.log('isExist : ', isExist);

    if (!isExist) {
      const user = this.create({ id, pw, nickname });
      await this.save(user);
    } else {
      throw new ConflictException('존재하는 유저입니다');
    }
  }
}
