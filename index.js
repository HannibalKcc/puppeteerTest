// 官方文档 https://github.com/GoogleChrome/puppeteer
const puppeteer = require('puppeteer');
const colors = require('colors');

console.log('浏览器开始运行'.magenta);
(async () => {
  const browser = await puppeteer.launch({
    headless: false, // 取消无毛模式，显示UI界面
    slowMo: 250 // 毫秒级别地延迟操作
  });
  const page = await browser.newPage();
  await page.goto('http://rennaiqian.com');
  await page.screenshot({path: 'example.png'});
  // await page.pdf({path: 'example.pdf', format: 'A4'}); // 目前仅在无头模式使用
  await browser.close();
})();
console.log('已经关闭浏览器'.magenta);

