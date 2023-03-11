import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
@Injectable()
export class ScrapperService {
  async getDataViaPuppeteer() {
    const URL = `https://www.inflearn.com/community/studies`;

    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome',
      headless: true,
      executablePath: '/usr/bin/chromium-browser',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    const data = [];

    for (let index = 1; index < 3; index++) {
      await page.goto(
        'https://www.inflearn.com/community/studies?page=' +
          index +
          '&order=recent',
        { waitUntil: 'networkidle2' },
      );

      await page.waitForSelector('div.question-list-container > ul > li');
      const lists = await page.$$('div.question-list-container > ul > li');

      for (let i = 0; i < lists.length; i++) {
        const list = lists[i];

        const title = await list.$eval(
          'h3',
          (element: HTMLElement) => element.innerText,
        );
        const url = await list.$eval(
          'a',
          (element) => (element as HTMLAnchorElement).href,
        );

        const badge = await list.$eval(
          'a > div > div > div.question__title > div > div > span',
          (element: HTMLElement) => element.innerText,
        );

        const dataArr = {
          title: title,
          url: url,
          badge: badge,
        };

        data.push(dataArr);
      }
    }

    await page.close();
    await browser.close();
    return data;
  }
}
