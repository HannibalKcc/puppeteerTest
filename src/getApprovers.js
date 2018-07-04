const addVotesLineImg = require('./addVotesLineImg');

async function getApprovers ({page, tar}) {
  let tarTest = /^https:\/\/www\.zhihu.com\/question\/\d+\/answer\/\d+$/.test(tar)
  if (!tarTest) {
    throw new Error('参数tar 必须是符合规范的知乎问答url！');
  }
  
  await page.goto(tar);
  let nodeBtn = await page.$('.Card .Button--plain');
  await nodeBtn.click(nodeBtn);
  let approversCounts = await getApproversCounts(page); // 获取点赞者总数
  await page.waitForSelector('.VoterList-content .List-item .UserLink-link');
  await page.evaluate(...scrollToCounts(page, approversCounts));
  
  return;
  // TODO addVotesLineImg({data}); // 数据生成图片
}

/**
 * 通过检索所有的ajax res，找出点赞者总数
 * */
async function getApproversCounts (page) {
  return new Promise((resolve, reject) => {
    page.on('response', responseEvent);
    
    async function responseEvent (res) {
      if ((/https:\/\/www.zhihu.com\/api\/v4\/answers\/\d+\/voters.*/).test(res.url())) {
        page.removeListener('response', responseEvent);
        resolve((await res.json()).paging.totals);
      }
    }
  });
}

/**
 * 控制无限滚动条 迭代滚动到指定位置
 * @return <Function> 控制滚动的函数
 * */
function scrollToCounts (page, maxApproversCounts = 0, limit = 100) {
  return [
    async (maxApproversCounts, limit) => {
      console.log(document.body);
      let nodeList = document.querySelector('.VoterList-content');
      let max = limit > 0 ? limit : maxApproversCounts;
      for (let curNum = 0; curNum < max; curNum += 10) {
        nodeList.scrollTop = nodeList.scrollHeight;
        await new Promise((resolve, reject)=>{
          setTimeout(()=>{
            resolve()
          },1e3); // 改进：除了setTimeout有没有更好的滚动方法了呢？
        });
      }
    },
    maxApproversCounts, limit
  ];
}

module.exports = getApprovers