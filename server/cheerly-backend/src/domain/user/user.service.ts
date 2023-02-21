import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/LoginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userData: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(userData);
  }

  async logIn(userData: LoginUserDto): Promise<{ accessToken: string }> {
    const { id, pw } = userData;

    const user = await this.userRepository.findOneBy({
      id: id,
    });
    const nickname = user.nickname;
    console.log('user -login: ', user);

    if (user && (await bcrypt.compare(pw, user.pw))) {
      // 유저 토큰 생성 (secret + payload)
      const payload = { id, nickname };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
