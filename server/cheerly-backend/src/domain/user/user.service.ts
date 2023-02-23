import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/LoginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private http: HttpService,
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

  async kakaoLogin(code: string) {
    const kakao_api_url = `https://kauth.kakao.com/oauth/token
    ?grant_type=authorization_code
    &client_id=${process.env.KAKAO_clientID}
    &redirect_url=${process.env.KAKAO_redirectUri}
    &code=${code}`;

    const token_res = await lastValueFrom(this.http.post(kakao_api_url));
    // const access_token: string = token_res.data.access_token;
    console.log(token_res);
  }

  //*********소미 추가**********
  //PATCH - 유저 프로필 사진
  async updateUserInfo(file, userId: string, userData: UpdateUserDto) {
    return await this.userRepository.update(
      {
        id: userId,
      },
      {
        ...userData,
        profile_img: file,
      },
    );
  }
}
