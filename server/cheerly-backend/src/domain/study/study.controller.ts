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

  //   //GET- 전체 공부 데이터
  //   @Get()
  //   async getStudies(@Req() req, @Res() res) {
  //     const studyData = await this.studyService.getStudies();
  //     //res.send(studyData)
  //     console.log(studyData);
  //     return studyData;
  //   }

  //GET - 특정 스터디 데이터 가져오기(userId)
  @Get()
  async getStudiesByUserId(@Req() req, @Res() res) {
    const studyDataByUser = await this.studyService.getStudiesByUserId();
    return studyDataByUser;
  }

  //GET - 날짜에 맞는 스터디 데이터 가져오기(Date)
  @Get('/date')
  async getStudiesByDate(@Req() req, @Res() res) {
    const studyDatabyDate = await this.studyService.getStudiesByDate();
    return studyDatabyDate;
  }

  //POST - 스터디 할 일 생성
  @Post()
  createStudy(@Body() createStudyDto: CreateStudyDto) {
    this.studyService.createStudy(createStudyDto);
  }

  //PATCH - 스터디 content, done, date 업데이트
  //일단 도메인은 /study/edit/스터디id로 설정
  @Patch('/edit/:id')
  async updateStudy(
    @Param('id', ParseIntPipe) studyId: number,
    @Body() updateStudyDto: UpdateStudyDto,
  ) {
    await this.studyService.updateStudy(studyId, updateStudyDto);
  }

  //DELETE - 투두 삭제
  @Delete('/delete/:id')
  async deleteStudy(@Param('id', ParseIntPipe) studyId: number) {
    await this.studyService.deleteStudy(studyId);
  }
}
