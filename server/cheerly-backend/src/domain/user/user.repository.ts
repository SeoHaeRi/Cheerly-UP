import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import * as bcrypt from 'bcryptjs';

// @CustomRepository(User)
// export class UserRepository extends Repository<User> {
//   async createUser(userData: CreateUserDto): Promise<void> {
//     const { id, pw, nickname } = userData;
//     const salt = await bcrypt.genSalt();
//     const hashedPW = await bcrypt.hash(pw, salt);
//     const isExist = await this.find({
//       select: ['id', 'nickname'],
//       where: [{ id: id }, { nickname: nickname }],
//     });

//     console.log('isExist : ', isExist);

//     if (isExist.length === 0) {
//       const user = this.create({ id, pw: hashedPW, nickname });
//       await this.save(user);
//     } else {
//       throw new ConflictException('존재하는 유저입니다');
//     }
//   }
// }

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(userData: CreateUserDto): Promise<void> {
    const { id, pw, nickname } = userData;
    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(pw, salt);
    const isExist = await this.find({
      select: ['id', 'nickname'],
      where: [{ id: id }, { nickname: nickname }],
    });

    console.log('isExist : ', isExist);

    if (isExist.length === 0) {
      const user = this.create({ id, pw: hashedPW, nickname });
      await this.save(user);
    } else {
      const flag = {
        id: false,
        nickname: false,
      };
      isExist.map((el) => {
        if (el.id == id && el.nickname == nickname) {
          flag.id = true;
          flag.nickname = true;
        } else if (el.id == id) flag.id = true;
        else if (el.nickname == nickname) flag.nickname = true;
      });
      if (flag.id && flag.nickname)
        throw new ConflictException('존재하는 아이디, 닉네임 입니다');
      else if (flag.id) throw new ConflictException('존재하는 아이디 입니다');
      else throw new ConflictException('존재하는 닉네임 입니다');
    }
  }
}
