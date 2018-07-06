// 官方文档 https://github.com/GoogleChrome/puppeteer
const puppeteer = require('puppeteer');
const colors = require('colors');
const getApprovers = require('./src/getApprovers');

(async () => {
  console.log('浏览器开始运行'.magenta);

  const browser = await puppeteer.launch({
    headless: false, // 取消无毛模式，显示UI界面
    // slowMo: 250 // 毫秒级别地延迟操作
  });
  const page = await browser.newPage();
  await getApprovers({page, tar: 'https://www.zhihu.com/question/54244634/answer/306330800'});

  console.log('操作已经结束'.magenta);
})();
