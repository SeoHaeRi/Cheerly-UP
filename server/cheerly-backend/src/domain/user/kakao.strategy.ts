import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.KAKAO_clientID,
      clientSecret: process.env.KAKAO_clientSecret,
      callbackURL: process.env.KAKAO_redirectUri,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const profileJson = profile._json;
    // console.log(profileJson);

    const kakaoID = profileJson.kakao_account.email;
    const pw = profileJson.id.toString();
    const nickname = profileJson.properties.nickname;

    try {
      const user: {
        accessToken: string;
        refreshToken: string;
        kakaoID: string;
        pw: string;
        nickname: string;
      } = {
        accessToken,
        refreshToken,
        kakaoID,
        pw,
        nickname,
      };
      done(null, user);
    } catch (error) {
      console.log(error);
      done(error);
    }
  }
}
