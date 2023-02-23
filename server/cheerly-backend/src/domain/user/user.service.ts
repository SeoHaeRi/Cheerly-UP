import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/LoginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import axios from 'axios';

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

    if (user && (await bcrypt.compare(pw, user.pw))) {
      // 유저 토큰 생성 (secret + payload)
      const payload = { id, nickname };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  async kakaoLogin(user): Promise<void> {
    // 회원 가입 된 유저인지 검사 (db에 저장하기 위해)
    const isExist = await this.userRepository.findOneBy({ id: user.kakaoID });
    if (isExist) return;
    else {
      const isExistNickname = await this.userRepository.findOneBy({
        nickname: user.nickname,
      });
      const userData = {
        id: user.kakaoID,
        pw: user.pw,
        nickname: user.nickname,
      };
      if (isExistNickname) {
        await axios
          .get('https://nickname.hwanmoo.kr/?format=json&max_length=30')
          .then((res) => {
            userData.nickname = res.data.words[0];
            return this.userRepository.createKakaoUser(userData);
          });
      } else return this.userRepository.createKakaoUser(userData);
    }
  }

  ////**************** */
  //PATCH - 유저 회원정보 수정
  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const { id, pw, nickname } = updateUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(pw, salt);
    return await this.userRepository.update(
      { id: userId },
      { ...updateUserDto, pw: hashedPW, nickname: nickname },
    );
  }

  //DELETE
  async deleteUser(userId: string) {
    return await this.userRepository.delete({ id: userId });
  }
}
