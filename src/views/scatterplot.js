// ScatterPlot.js
import React, { useEffect } from 'react'
import * as echarts from 'echarts'

const data = [
  { x: -1.42801093, y: 1.10561123, category: 1 },
  { x: -1.29529303, y: -1.41006788, category: 1 },
  { x: -0.80898999, y: 0.62965364, category: 1 },
  { x: -0.41432167, y: 0.73519607, category: 1 },
  { x: 1.05242867, y: -0.23346021, category: 1 },
  { x: -0.09429208, y: -0.95754731, category: 1 },
  { x: -0.11911161, y: 1.16653329, category: 1 },
  { x: -0.33480238, y: 1.40760057, category: 1 },
  { x: 0.54599968, y: -1.30718242, category: 1 },
  { x: 1.31833233, y: 1.40568273, category: 1 },
  { x: -0.06979746, y: -1.17765624, category: 1 },
  { x: 0.61743222, y: 0.00947239, category: 1 },
  { x: 0.9781618, y: -0.02250941, category: 1 },
  { x: 0.71702914, y: 1.61999537, category: 2 },
  { x: 1.50286592, y: 1.89952624, category: 2 },
  { x: 0.94615839, y: -1.04287639, category: 2 },
  { x: 1.03635761, y: 1.97417826, category: 2 },
  { x: -0.28497728, y: -0.69575988, category: 2 },
  { x: 2.3225196, y: 0.7032019, category: 2 },
  { x: 2.7614632, y: -1.38313597, category: 2 },
  { x: -0.97225712, y: -0.0103952, category: 2 },
  { x: 0.69344572, y: -0.46460498, category: 2 },
  { x: 0.18299133, y: -0.57268804, category: 2 },
  { x: 0.12900848, y: -0.70008792, category: 2 },
  { x: 1.0769734, y: 1.89338292, category: 2 },
  { x: -1.43709141, y: 0.55716836, category: 2 },
  { x: 1.9329731, y: 1.68126592, category: 2 },
  { x: -2.19111291, y: -1.23746387, category: 2 },
  { x: -0.87332359, y: -1.70289081, category: 3 },
  { x: -2.20161978, y: -0.14626638, category: 3 },
  { x: -2.74838649, y: 0.9643953, category: 3 },
  { x: -0.88127534, y: 1.11310134, category: 3 },
  { x: -0.40263178, y: 0.13662312, category: 3 },
  { x: -0.46900394, y: -0.40704695, category: 3 },
  { x: -1.72754722, y: -1.87657069, category: 3 },
  { x: -2.25527182, y: -1.41104568, category: 3 },
  { x: -1.43440845, y: 0.30575937, category: 3 },
  { x: -1.4348005, y: -0.59519363, category: 3 },
  { x: -1.90537923, y: -0.77957497, category: 3 },

]

const ScatterPlot = () => {
  useEffect(() => {
    // 在组件挂载后初始化 echarts 图表
    const chartDom = document.getElementById('scatter-plot')
    const myChart = echarts.init(chartDom)

    // 提取不同的类别
    const categories = [...new Set(data.map((item) => item.category))]

    // 颜色映射，根据类别分配颜色
    const colorMap = {
      1: '#E57373', // Red
      2: '#64B5F6', // Blue
      3: '#81C784', // Green
    }

    const option = {
      xAxis: {},
      yAxis: {},
      legend: {
        data: ['人物', '山水', '花鸟'], // 自定义图例名称
      },
      // series: categories.map((category) => ({
      //   name: category === 1 ? '人物' : category === 2 ? '山水' : '花鸟', // 根据类别指定名称
      //   symbol: 'diamond',
      //   symbolSize: 20,
      //   data: data
      //     .filter((item) => item.category === category) // 过滤出对应类别的数据
      //     .map((item) => [item.x, item.y, item.category]), // 转换成 [x, y] 格式
      //   type: 'scatter',
      //   itemStyle: {
      //     color: colorMap[category], // 使用颜色映射
      //   },
      // })),
      series: categories.map((category) => (
        {
          name: category === 1 ? '人物' : category === 2 ? '山水' : '花鸟', // 根据类别指定名称
          data: data
            .filter((item) => item.category === category) // 过滤出对应类别的数据
            .map((item) => [item.x, item.y, item.category]), // 转换成 [x, y] 格式
          type: 'custom',
          // coordinateSystem: 'catesian2d',
          renderItem: function (params, api) {
            const x = api.value(0)
            const y = api.value(1)
            const category = api.value(2)
            // console.log(params)
            // console.log(api)
            // console.log(api.coord([x, y]))
            // console.log(x, y, category)

            // 计算六边形各个点的坐标
            const R = 0.1 // 六边形半径大小
            const points = []
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i
              const xOffset = Math.cos(angle) * R
              const yOffset = Math.sin(angle) * R
              // console.log(xOffset, yOffset)
              points.push(api.coord([x + xOffset, y + yOffset]))
            }
            // console.log(points)
            // console.log(colorMap[category])

            // 绘制六边形
            return {
              type: 'polygon',
              shape: {
                points: points,
              },
              style: {
                fill: colorMap[category],
              },
              emphasis: {
                style: {
                  fill: colorMap[category],
                },
              },
            }
          },
        }
      )),
      dataZoom: [
        {
          type: 'inside', // 内置型数据缩放组件
          xAxisIndex: [0], // 指定缩放影响的 x 轴
          yAxisIndex: [0], // 指定缩放影响的 y 轴
        },
      ],
      tooltip: {
        trigger: 'item', // 触发类型设置为 item，表示鼠标悬浮到数据点上触发
        formatter: function (params) {
          // params 中包含了悬浮的数据，params.data 包含了 info 数据
          return `${params.data[0]} ${params.data[1]}, cat: ${params.data[2] === 1 ? '人物' : params.data[2] === 2 ? '山水' : '花鸟'}` // 显示 info 数据
        },
      },
    }

    myChart.setOption(option)

    // 当组件卸载时销毁 echarts 图表
    return () => {
      myChart.dispose()
    }
  }, [])

  return <div id="scatter-plot" style={{ width: '400px', height: '400px' }} />
}

export default ScatterPlot
