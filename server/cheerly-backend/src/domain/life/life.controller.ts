import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CreateLifeDto } from './dtos/CreateLife.dto';
import { UpdateLifeDto } from './dtos/UpdateLife.dto';
import { LifeService } from './life.service';

@Controller('life')
export class LifeController {
  constructor(private lifeService: LifeService) {}

  //GET- 전체 라이프 데이터
  //   @Get()
  //   async getLives(@Req() req, @Res() res) {
  //     const lifeData = await this.lifeService.getLives();
  //     res.send(lifeData);
  //     console.log(lifeData);
  //     return lifeData;
  //   }

  //GET - 특정 라이프 데이터 가져오기 => userID + date
  @Get('/:id')
  async getLivesByUserId(@Param('id') userId: string, @Req() req, @Res() res) {
    const lifeDataByUser = await this.lifeService.getLivesByUserId(userId);
    res.send(lifeDataByUser);
    return lifeDataByUser;
  }

  //GET - 특정 라이프 데이터 가져오기 ( userId + done)
  @Get('/record/:id')
  async getLivesRecord(@Param('id') userId: string, @Req() req, @Res() res) {
    const lifeDataRecord = await this.lifeService.getLivesRecord(userId);
    res.send(lifeDataRecord);
    return lifeDataRecord;
  }

  //POST - 라이프 투두리스트 할 일 생성
  @Post()
  async createLife(@Body() createLifeDto: CreateLifeDto) {
    await this.lifeService.createLife(createLifeDto);
  }

  //PATCH <- user_id, life_id 필요
  @Patch(':id/:ld')
  async updateLife(
    @Param('id') userId: string,
    @Param('ld') lifeId: number,
    @Body() updateLifeDto: UpdateLifeDto,
  ) {
    await this.lifeService.updateLife(userId, lifeId, updateLifeDto);
  }

  //DELETE
  @Delete('/:id/:ld')
  async deleteLife(@Param('id') userId: string, @Param('ld') lifeId: number) {
    await this.lifeService.deleteLife(userId, lifeId);
  }
}
