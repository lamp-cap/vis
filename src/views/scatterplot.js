// ScatterPlot.js
import React, { useEffect } from 'react'
import * as echarts from 'echarts'

const data = [
  { x: -1.42801093, y: 1.10561123, category: 3, op1: 0.75, op2: 0.98, op3: 0.11, op4: 0.34, op5: 0.69, op6: 0.42 },
  { x: -1.29529303, y: -1.41006788, category: 2, op1: 0.87, op2: 0.23, op3: 0.56, op4: 0.98, op5: 0.32, op6: 0.77 },
  { x: -0.80898999, y: 0.62965364, category: 1, op1: 0.45, op2: 0.67, op3: 0.89, op4: 0.12, op5: 0.54, op6: 0.76 },
  { x: -0.41432167, y: 0.73519607, category: 2, op1: 0.34, op2: 0.68, op3: 0.91, op4: 0.21, op5: 0.78, op6: 0.43 },
  { x: 1.05242867, y: -0.23346021, category: 1, op1: 0.65, op2: 0.32, op3: 0.75, op4: 0.43, op5: 0.89, op6: 0.56 },
  { x: -0.09429208, y: -0.95754731, category: 2, op1: 0.88, op2: 0.55, op3: 0.34, op4: 0.76, op5: 0.11, op6: 0.98 },
  { x: -0.11911161, y: 1.16653329, category: 3, op1: 0.99, op2: 0.45, op3: 0.67, op4: 0.32, op5: 0.88, op6: 0.21 },
  { x: -0.33480238, y: 1.40760057, category: 1, op1: 0.21, op2: 0.87, op3: 0.55, op4: 0.99, op5: 0.44, op6: 0.65 },
  { x: 0.54599968, y: -1.30718242, category: 3, op1: 0.33, op2: 0.66, op3: 0.45, op4: 0.68, op5: 0.22, op6: 0.89 },
  { x: 1.31833233, y: 1.40568273, category: 2, op1: 0.67, op2: 0.45, op3: 0.34, op4: 0.89, op5: 0.11, op6: 0.77 },
  { x: -0.06979746, y: -1.17765624, category: 1, op1: 0.77, op2: 0.11, op3: 0.22, op4: 0.45, op5: 0.67, op6: 0.33 },
  { x: 0.61743222, y: 0.00947239, category: 2, op1: 0.32, op2: 0.88, op3: 0.76, op4: 0.21, op5: 0.89, op6: 0.55 },
  { x: 0.9781618, y: -0.02250941, category: 1, op1: 0.56, op2: 0.34, op3: 0.88, op4: 0.55, op5: 0.21, op6: 0.99 },
  { x: 0.71702914, y: 1.61999537, category: 1, op1: 0.78, op2: 0.44, op3: 0.11, op4: 0.67, op5: 0.45, op6: 0.32 },
  { x: 1.50286592, y: 1.89952624, category: 1, op1: 0.88, op2: 0.21, op3: 0.99, op4: 0.33, op5: 0.68, op6: 0.44 },
  { x: 0.94615839, y: -1.04287639, category: 2, op1: 0.32, op2: 0.76, op3: 0.56, op4: 0.44, op5: 0.99, op6: 0.21 },
  { x: 1.03635761, y: 1.97417826, category: 2, op1: 0.56, op2: 0.34, op3: 0.88, op4: 0.55, op5: 0.21, op6: 0.99 },
  { x: -0.28497728, y: -0.69575988, category: 3, op1: 0.43, op2: 0.89, op3: 0.21, op4: 0.77, op5: 0.34, op6: 0.88 },
  { x: 2.3225196, y: 0.7032019, category: 3, op1: 0.55, op2: 0.21, op3: 0.99, op4: 0.34, op5: 0.67, op6: 0.45 },
  { x: 2.7614632, y: -1.38313597, category: 1, op1: 0.76, op2: 0.55, op3: 0.32, op4: 0.45, op5: 0.78, op6: 0.11 },
  { x: -0.97225712, y: -0.0103952, category: 3, op1: 0.98, op2: 0.11, op3: 0.77, op4: 0.44, op5: 0.67, op6: 0.34 },
  { x: 0.69344572, y: -0.46460498, category: 1, op1: 0.11, op2: 0.67, op3: 0.43, op4: 0.88, op5: 0.34, op6: 0.76 },
  { x: 0.18299133, y: -0.57268804, category: 3, op1: 0.99, op2: 0.45, op3: 0.21, op4: 0.76, op5: 0.55, op6: 0.32 },
  { x: 0.12900848, y: -0.70008792, category: 3, op1: 0.55, op2: 0.21, op3: 0.88, op4: 0.34, op5: 0.99, op6: 0.43 },
  { x: 1.0769734, y: 1.89338292, category: 1, op1: 0.45, op2: 0.76, op3: 0.34, op4: 0.99, op5: 0.21, op6: 0.88 },
  { x: -1.43709141, y: 0.55716836, category: 2, op1: 0.67, op2: 0.88, op3: 0.99, op4: 0.32, op5: 0.45, op6: 0.76 },
  { x: 1.9329731, y: 1.68126592, category: 1, op1: 0.21, op2: 0.34, op3: 0.67, op4: 0.88, op5: 0.99, op6: 0.55 },
  { x: -2.19111291, y: -1.23746387, category: 3, op1: 0.43, op2: 0.76, op3: 0.11, op4: 0.55, op5: 0.34, op6: 0.88 },
  { x: -0.87332359, y: -1.70289081, category: 2, op1: 0.33, op2: 0.55, op3: 0.21, op4: 0.99, op5: 0.45, op6: 0.67 },
  { x: -2.20161978, y: -0.14626638, category: 1, op1: 0.99, op2: 0.21, op3: 0.76, op4: 0.34, op5: 0.88, op6: 0.11 },
  { x: -2.74838649, y: 0.9643953, category: 2, op1: 0.32, op2: 0.43, op3: 0.55, op4: 0.76, op5: 0.67, op6: 0.88 },
  { x: -0.88127534, y: 1.11310134, category: 1, op1: 0.88, op2: 0.67, op3: 0.76, op4: 0.55, op5: 0.43, op6: 0.32 },
  { x: -0.40263178, y: 0.13662312, category: 3, op1: 0.76, op2: 0.88, op3: 0.43, op4: 0.32, op5: 0.11, op6: 0.99 },
  { x: -0.46900394, y: -0.40704695, category: 2, op1: 0.45, op2: 0.34, op3: 0.76, op4: 0.88, op5: 0.99, op6: 0.21 },
  { x: -1.72754722, y: -1.87657069, category: 2, op1: 0.21, op2: 0.67, op3: 0.45, op4: 0.88, op5: 0.32, op6: 0.99 },
  { x: -2.25527182, y: -1.41104568, category: 1, op1: 0.34, op2: 0.88, op3: 0.67, op4: 0.99, op5: 0.21, op6: 0.45 },
  { x: -1.43440845, y: 0.30575937, category: 2, op1: 0.32, op2: 0.55, op3: 0.21, op4: 0.67, op5: 0.99, op6: 0.76 },
  { x: -1.4348005, y: -0.59519363, category: 1, op1: 0.21, op2: 0.88, op3: 0.76, op4: 0.43, op5: 0.34, op6: 0.99 },
  { x: -1.90537923, y: -0.77957497, category: 1, op1: 0.67, op2: 0.34, op3: 0.55, op4: 0.88, op5: 0.21, op6: 0.76 },
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
      1: '#64B5F6', // Blue
      2: '#81C784', // Green
      3: '#E57373', // Red
    }

    const option = {
      xAxis: {
        type: 'value',
        min: -3,
        max: 3
      },
      yAxis: {
        type: 'value',
        min: -3,
        max: 3
      },
      legend: {
        data: ['人物', '山水', '花鸟'],
      },
      color: ['#E57373', '#81C784', '#64B5F6',],
      series: categories.map((category) => (
        {
          name: category === 1 ? '人物' : category === 2 ? '山水' : '花鸟', // 根据类别指定名称
          data: data
            .filter((item) => item.category === category) // 过滤出对应类别的数据
            .map((item) => [item.x, item.y, item.category, item.op1, item.op2, item.op3, item.op4, item.op5, item.op6]),
          type: 'custom',
          // coordinateSystem: 'catesian2d',
          renderItem: function (params, api) {
            const x = api.value(0)
            const y = api.value(1)
            const category = api.value(2)
            const op1 = api.value(3)
            const op2 = api.value(4)
            const op3 = api.value(5)
            const op4 = api.value(6)
            const op5 = api.value(7)
            const op6 = api.value(8)
            // console.log(op1, op2, op3, op4, op5, op6)

            // 计算六边形各个点的坐标
            const R = 0.2 // 六边形半径大小
            const points = []
            const points1 = []
            const points2 = []
            const points3 = []
            const points4 = []
            const points5 = []
            const points6 = []
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i
              const xOffset = Math.cos(angle) * R
              const yOffset = Math.sin(angle) * R
              points.push(api.coord([x + xOffset, y + yOffset]))
            }
            points1.push(api.coord([x, y]), points[0], points[1])
            points2.push(api.coord([x, y]), points[1], points[2])
            points3.push(api.coord([x, y]), points[2], points[3])
            points4.push(api.coord([x, y]), points[3], points[4])
            points5.push(api.coord([x, y]), points[4], points[5])
            points6.push(api.coord([x, y]), points[5], points[0])

            // Add opacity to the hexagon fill color
            const opacity = 0.8 // Adjust opacity as needed
            const fillColor = colorMap[category]

            // 绘制六边形
            return {
              type: 'group',
              children: [{
                type: 'polygon',
                shape: {
                  points: points1,
                },
                style: {
                  fill: fillColor,
                  opacity: op1,
                  // stroke: '#000',
                },
                emphasis: {
                  scale: true
                },
              }, {
                type: 'polygon',
                shape: {
                  points: points2,
                },
                style: {
                  fill: fillColor,
                  opacity: op2,
                  // stroke: '#000',
                },
                emphasis: {
                  scale: true
                },
              }, {
                type: 'polygon',
                shape: {
                  points: points3,
                },
                style: {
                  fill: fillColor,
                  opacity: op3,
                  // stroke: '#000',
                },
                emphasis: {
                  scale: true
                },
              }, {
                type: 'polygon',
                shape: {
                  points: points4,
                },
                style: {
                  fill: fillColor,
                  opacity: op4,
                  // stroke: '#000',
                },
                emphasis: {
                  scale: true
                },
              }, {
                type: 'polygon',
                shape: {
                  points: points5,
                },
                style: {
                  fill: fillColor,
                  opacity: op5,
                  // stroke: '#000',
                },
                emphasis: {
                  scale: true
                },
              }, {
                type: 'polygon',
                shape: {
                  points: points6,
                },
                style: {
                  fill: fillColor,
                  opacity: op6,
                  // stroke: '#000',
                },
                emphasis: {
                  scale: true
                },
              },
              ]
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

  return <div id="scatter-plot" style={{ width: '100%', height: '100%' }} />
}

export default ScatterPlot
