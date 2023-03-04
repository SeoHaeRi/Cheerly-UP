import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ScrapperService {
  async getDataViaPuppeteer() {
    const URL = `https://www.inflearn.com/community/studies`;

    //headless: true -> 개발 모드일 때만 false 새창이 뜨고,
    //배포 모드일 때는 크롤링할 사이트가 뜨지 않는다.
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome',
      headless: true,
      args: ['--fast-start', '--disable-extensions', '--no-sandbox'],
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    const data = [];

    for (let index = 1; index < 3; index++) {
      await page.goto(
        'https://www.inflearn.com/community/studies?page=' +
          index +
          '&order=recent',
        {
          waitUntil: 'networkidle2',
        },
      );

      //const content = await page.content();
      // const content = await page.waitForSelector('li.question_container');

      //$ - 엘리먼트 반환, $eval - 콜백함수 전달, element를 인자로 받음

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
    }
    // const url = await page.$$eval(
    //   'div.question-list-container > ul > li > a',
    //   (data) =>
    //     data.map((data) => {
    //       return data.href;
    //     }),
    // );

    await page.close();
    await browser.close();
    return data;
  }
}
