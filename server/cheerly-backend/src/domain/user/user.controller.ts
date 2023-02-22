import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) userData: CreateUserDto): Promise<void> {
    return await this.userService.signUp(userData);
  }

  @Post('/login')
  logIn(
    @Body(ValidationPipe) userData: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.logIn(userData);
  }

  @Get('/kakao')
  viewKakaoLogIn(@Res() res) {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_clientID}&redirect_uri=${process.env.KAKAO_redirectUri}&response_type=code`;
    res.redirect(kakaoAuthURL);
  }
  @Get('/kakao/redirect')
  // @Redirect(
  //   `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_clientID}&redirect_uri=${process.env.KAKAO_redirectUri}&response_type=code`,
  // )
  kakaoLogIn(@Query('code') code: string) {
    return this.userService.kakaoLogin(code);
  }

  @Post('/verify')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    return req.user;
  }
}
