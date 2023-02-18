import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/LoginUser.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async signUp(userData: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(userData);
  }

  async logIn(userData: LoginUserDto): Promise<string> {
    const { id, pw } = userData;
    const user = await this.userRepository.find({
      where: { id: id },
    });
    console.log('user: ', user);

    if (user && (await bcrypt.compare(pw, user[0].pw))) {
      return 'login success';
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
