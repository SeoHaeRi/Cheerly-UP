import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { CreateStudyDto } from './dtos/CreateStudy.dto';
import { UpdateStudyDto } from './dtos/UpdateStudy.dto';
import { StudyService } from './study.service';

@Controller('study')
export class StudyController {
  constructor(private studyService: StudyService) {}

  // //GET- 전체 공부 데이터
  // @Get()
  // async getStudies(@Req() req, @Res() res) {
  //   const studyData = await this.studyService.getStudies();
  //   res.send(studyData);
  //   console.log(studyData);
  //   return studyData;
  // }

  //GET - 특정 스터디 데이터 가져오기(userId + date)
  @Get('/:id')
  async getStudiesByUserId(
    @Param('id') userId: string,
    @Req() req,
    @Res() res,
  ) {
    const studyDataByUser = await this.studyService.getStudiesByUserId(userId);
    res.send(studyDataByUser);
    return studyDataByUser;
  }

  //GET - 특정 스터디 데이터 가져오기(userId + done)
  @Get('/record/:id')
  async getStudiesRecord(@Param('id') userId: string, @Req() req, @Res() res) {
    const studyDataRecord = await this.studyService.getStudiesRecord(userId);
    res.send(studyDataRecord);
    return studyDataRecord;
  }

  //GET - 날짜에 맞는 스터디 데이터 가져오기(Date)
  // @Get('/date')
  // async getStudiesByDate(@Req() req, @Res() res) {
  //   const studyDatabyDate = await this.studyService.getStudiesByDate();
  //   return studyDatabyDate;
  // }

  //POST - 스터디 할 일 생성
  @Post()
  async createStudy(@Body() createStudyDto: CreateStudyDto) {
    await this.studyService.createStudy(createStudyDto);
  }

  //PATCH - 스터디 content, done, date 업데이트
  //특정 유저의 특정 스터디 id의 정보를 업데이트해야함.
  @Patch('/:id/:sd')
  async updateStudy(
    @Param('id') userId: string,
    @Param('sd') studyId: number,
    @Body() updateStudyDto: UpdateStudyDto,
  ) {
    await this.studyService.updateStudy(userId, studyId, updateStudyDto);
  }

  //DELETE - 투두 삭제
  @Delete('/:id/:sd')
  async deleteStudy(@Param('id') userId: string, @Param('sd') studyId: number) {
    await this.studyService.deleteStudy(userId, studyId);
  }
}
