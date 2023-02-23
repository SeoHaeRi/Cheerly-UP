import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'lib/multerOptions';
import multer, { diskStorage } from 'multer';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserService } from './user.service';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

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

  //////
  //회원 정보 수정
  @Patch('/edit/:id')
  async updateUserData(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const editUser = await this.userService.updateUser(userId, updateUserDto);
    console.log(editUser);
    return editUser;
  }

  @Delete('/:id')
  async deleteUserData(@Param('id') userId: string) {
    await this.userService.deleteUser(userId);
  }
}
