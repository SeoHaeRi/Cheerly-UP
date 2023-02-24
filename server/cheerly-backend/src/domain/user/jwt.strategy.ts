import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/User.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    // 부모 컴포넌트 부분 사용하기 위해서
    super({
      secretOrKey: 'SecretCheer123',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload) {
    const { id } = payload;
    const user: User = await this.userRepository.findOneBy({
      id: id,
    });

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
