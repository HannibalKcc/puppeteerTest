const path = require('path');
const echarts = require("echarts");
const node_echarts = require('node-echarts');

/**
 * 生成点赞时间图，并写入imgs文件夹内
 * @params path
 * */
function addVotesLineImg ({
                            data,
                            path = getDefaultPath()
                          }) {
  let option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '50%'];
      }
    },
    title: {
      left: 'center',
      text: '问题、回答的点赞趋势', // TODO
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map(data => data.date)
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [],
    series: [
      {
        name: '点赞数量',
        type: 'line',
        smooth: true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          normal: {
            color: 'rgb(255, 70, 131)'
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(255, 158, 68)'
            }, {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }])
          }
        },
        data: data.map(data => data.data)
      }
    ]
  }
  
  node_echarts({
    width: 500,
    height: 500,
    option, // Echarts configuration, type is Object.
    path //If the path  is not set, return the Buffer of image.
  })
}

// 生成默认图片地址
function getDefaultPath () {
  let date = new Date();
  return path.join(__diranme, '../imgs', `${date.getTime()}.png`);
}

module.exports = addVotesLineImg