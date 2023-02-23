import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
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
  @HttpCode(200)
  @UseGuards(AuthGuard('kakao'))
  async viewKakaoLogIn() {
    return HttpStatus.OK;
  }
  @Get('/kakao/redirect')
  @HttpCode(200)
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogIn(@Req() req, @Res() res): Promise<void> {
    await this.userService.kakaoLogin(req.user);
    console.log(req);
    res.cookie('kakao', req.user.accessToken);
    res.redirect('http://localhost:3000');
  }
  @Get('/kakao/logout')
  @HttpCode(200)
  async viewKakaoLogOut(@Res() res) {
    const kakaoLogout = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.KAKAO_clientID}&logout_redirect_uri=${process.env.KAKAO_logoutRedirectUri}`;
    res.redirect(kakaoLogout);
  }

  @Post('/verify')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    return req.user;
  }
}
