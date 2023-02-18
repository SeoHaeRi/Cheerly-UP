import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';

// @CustomRepository(User)
// export class UserRepository extends Repository<User> {
//   async createUser(userData: CreateUserDto): Promise<void> {
//     const { id, pw, nickname } = userData;
//     const user = this.create({ id, pw, nickname });

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
    const user = this.create({ id, pw, nickname });

    await this.save(user);
  }
  // async findByUsername(username: string): Promise<User> {
  //   const result = await this.createQueryBuilder('user')
  //     .where('user.username = :username', { username: username })
  //     .getOne();
  //   return result;
  // }
}
