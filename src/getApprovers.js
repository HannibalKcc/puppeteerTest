const addVotesLineImg = require('./addVotesLineImg');

async function getApprovers ({page, tar}) {
  let tarTest = /^https:\/\/www\.zhihu.com\/question\/\d+\/answer\/\d+$/.test(tar)
  if (!tarTest) {
    throw new Error('参数tar 必须是符合规范的知乎问答url！');
  }
  
  await page.goto(tar);
  // TODO 滚动获取更多
  let nodeBtn = await page.$('.Card .Button--plain');
  await nodeBtn.click(nodeBtn);
  await page.waitForSelector('.VoterList-content .List-item .UserLink-link');
  await page.evaluate(() => {
    document.querySelector('.VoterList-content').scrollTop = 999;
    // TODO 等待渲染 继续滚动
  });
  // nodeListBox.scrollTop = 999; // 直接设置滚动到底
  // let nodeLinkList = await page.$$eval('.VoterList-content .List-item .UserLink-link', node => node);
  // let linkList = nodeLinkList.map(node => node.href) // 获取点赞者个人页面
  
  return;
  
  let data = [{date: 1, data: 2}] // TODO
  linkList.forEach(async link => {
    // await getActivies(page, link)
  })
  addVotesLineImg({data}); // 数据生成图片
}

module.exports = getApprovers
