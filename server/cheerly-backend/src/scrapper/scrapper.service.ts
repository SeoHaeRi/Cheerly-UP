import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ScrapperService {
  async getDataViaPuppeteer() {
    const URL = `https://www.inflearn.com/community/studies`;

    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();

    // await page.setViewport({
    //   width: 1280,
    //   height: 800,
    //   deviceScaleFactor: 1,
    // });

    await page.goto(URL, {
      waitUntil: 'networkidle2',
    });

    //const content = await page.content();
    // const content = await page.waitForSelector('li.question_container');

    //$ - 엘리먼트 반환, $eval - 콜백함수 전달, element를 인자로 받음

    let data = [];

    const lists = await page.$$('div.question-list-container > ul > li');

    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];

      const title = await list.$eval('h3', (element) => element.innerText);
      const url = await list.$eval('a', (element) => element.href);
      const badge = await list.$eval(
        'a > div > div > div.question__title > div > div > span',
        (element) => element.innerText,
      );

      const dataArr = {
        title: title,
        url: url,
        badge: badge,
      };

      data.push(dataArr);
    }

    // const url = await page.$$eval(
    //   'div.question-list-container > ul > li > a',
    //   (data) =>
    //     data.map((data) => {
    //       return data.href;
    //     }),
    // );

    console.log(data);

    await page.close();
    await browser.close();
    //return 'scrapper service working!';
  }
}
