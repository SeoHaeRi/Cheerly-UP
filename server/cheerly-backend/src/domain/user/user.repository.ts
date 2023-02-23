import { ConflictException, Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/UpdateUser.dto';

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

  async createKakaoUser(userData: CreateUserDto): Promise<void> {
    const { id, pw, nickname } = userData;
    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(pw, salt);
    const user = this.create({ id, pw: hashedPW, nickname });
    await this.save(user);
  }
}
