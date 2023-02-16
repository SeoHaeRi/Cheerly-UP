import { Controller, Get, Req, Res } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';

//도메인
@Controller('studygroup')
export class ScrapperController {
  constructor(private scrapperService: ScrapperService) {}

  @Get()
  async scrapperController(@Req() req, @Res() res) {
    const result = await this.scrapperService.getDataViaPuppeteer();

    res.send(result);
  }
}
