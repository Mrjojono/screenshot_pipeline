import  utils from "../utils.js";
// __tests__/screenshot.test.js

import puppeteer from 'puppeteer';
import {toMatchImageSnapshot} from "jest-image-snapshot";

// Extend Jest
expect.extend({ toMatchImageSnapshot });



test('music UI should match the previous screenshot ', async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true});
    const page = await browser.newPage();



    await page.goto('http://localhost:5173/musique', { waitUntil: 'networkidle2' });

    const screenshot = await page.screenshot();

    expect(screenshot).toMatchImageSnapshot({
        failureThreshold: 0.01,
        failureThresholdType: 'percent',
      });

      await browser.close();
},6000);

