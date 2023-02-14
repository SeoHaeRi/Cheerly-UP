import { Controller, Get } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';

//도메인
@Controller('scrapper')
export class ScrapperController {
  constructor(private scrapperService: ScrapperService) {}

  @Get()
  scrapperController() {
    return this.scrapperService.getDataViaPuppeteer();
  }
}
