import puppeteer from 'puppeteer';
import {toMatchImageSnapshot} from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });

let   data = {
    name: "joan",
    website: "test.site",
    email:"jaon@gmail.com",
    job:"developper",
    linkdin:"developer.linkdin",
    picture:"",
    about:"developpement de logiciel game interst call of duty player and more fun with manga",
    interest:"i am interest in mobile  developement and machine learning"
}


test('Homepage ui should match the previous screenshot', async () =>{
    const browser =  await  puppeteer.launch();
    const page = await  browser.newPage();
    await  page.goto('http://localhost:5173/',{waitUntil:'networkidle0'});
    const screenshot2 = await  page.screenshot();

    expect(screenshot2).toMatchImageSnapshot({
        failureThreshold: 0.01,
        failureThresholdType: 'percent',
    })
    await  browser.close();
},5000)
