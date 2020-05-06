<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div class="chart-wrapper">
        <bar-chart :echart-option="echartOption" />
      </div>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import BarChart from './components/BarChart'
import { GetIndex } from '@/api/assistant/assistant'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

const barChart = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {}
    }
  ]
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    BarChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      echartOption: barChart
    }
  },
  created() {
    this.getIndex()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    getIndex() {
      // console.log('aaaaaa')
      GetIndex().then(response => {
        var xData = []
        var yData = []
        console.log(response.data)
        var data = response.data
        var index
        for (index of data) {
          var name = index.name
          xData.push(name)

          var current = index.pettm
          var medium = index.mediumPettm
          var danger = index.dangerPettm
          var chance = index.chancePettm
          var v
          if (current > medium) {
            v = (current - medium) / (danger - medium)
          } else {
            v = (current - medium) / (medium - chance)
          }
          yData.push(v.toFixed(4))
        }
        this.echartOption = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: xData,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              scale: true
            }
          ],
          series: [
            {
              name: 'pe百分比',
              type: 'bar',
              barWidth: '60%',
              itemStyle: {
                normal: {
                  color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      '#9BCA63',
                      '#B5C334',
                      '#27727B',
                      '#FCCE10',
                      '#C1232B',
                      '#FE8463',
                      '#9BCA63',
                      '#FAD860',
                      '#F3A43B',
                      '#60C0DD',
                      '#D7504B',
                      '#C6E579',
                      '#F4E001',
                      '#F0805A',
                      '#26C0C0'
                    ]
                    return colorList[params.dataIndex]
                  },
                  // 以下为是否显示，显示位置和显示格式的设置了
                  label: {
                    show: true,
                    position: 'top',
                    //                             formatter: '{c}'
                    formatter: '{b}\n{c}'
                  }
                }
              },
              data: yData,
              markLine: {
                label: {
                  show: true,
                  formatter: function(param) {
                    return param.name
                  }
                },
                data: [
                  {
                    name: '危险',
                    yAxis: 1,
                    lineStyle: {
                      color: 'red'
                    }
                  },
                  {
                    name: '卖出',
                    yAxis: 0.618,
                    lineStyle: {
                      color: 'yellow'
                    }
                  },
                  {
                    name: '中位数',
                    yAxis: -0.05,
                    lineStyle: {
                      color: 'black'
                    }
                  },
                  {
                    name: '买入',
                    yAxis: -0.618,
                    lineStyle: {
                      color: 'green'
                    }
                  },
                  {
                    name: '机会',
                    yAxis: -1,
                    lineStyle: {
                      color: 'blue'
                    }
                  }
                ]
              }
            }
          ]
        }
        console.log(this.echartOption)
      })
      // console.log(res)
      // console.log(res.data)
      // console.log('bbbbbb')

      /*
      var data = res.data
      var index
      for (index of data) {
        var name = index.name
        xData.push(name)

        var current = index.pettm
        var medium = index.mediumPettm
        var danger = index.dangerPettm
        var chance = index.chancePettm
        var v
        if (current > medium) {
          v = (current - medium) / (danger - medium)
        } else {
          v = (current - medium) / (medium - chance)
        }
        yData.push(v)
      }
      */
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
