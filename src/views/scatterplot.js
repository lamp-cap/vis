import React, { useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react';
import { useDispatch } from 'react-redux';
import { change1 } from "../store/data1";

// 颜色映射，根据类别分配颜色
const colorMap = {
  1: '#E57373', // Red
  2: '#81C784', // Green
  3: '#64B5F6', // Blue
}

export default function ScatterPlot () {
  const [series, changeSeries] = useState([]);
  const categories =[1, 2, 3];
  const dispatch = useDispatch();

  useEffect(() => {
    initialize();
  },[])

  const initialize = () => {
    fetch('./assets/paintingCoord.json')
    .then(res => res.json())
    .then(json => {
      var i;
      var data = [];
      for(i=0; i<=categories.length;i++) data[i]=[]
      var res = [];
      for(i = 0; i < json.length; i++) {
        // console.log(json[i])
        data[json[i].category].push({
          value: [json[i].x, json[i].y, json[i].category, json[i].op1, json[i].op2, json[i].op3, json[i].op4, json[i].op5, json[i].op6],
        })
      }
      console.log(data)
      for(i=1; i<=categories.length;i++)
      {
        res.push({
              name: i === 1 ? '人物' : i === 2 ? '山水' : '花鸟', // 根据类别指定名称
              data: data[i],
                // .filter((item) => item.category === i) // 过滤出对应类别的数据
                // .map((item) => [item.x, item.y, item.category, item.op1, item.op2, item.op3, item.op4, item.op5, item.op6]),
              type: 'custom',
              // coordinateSystem: 'catesian2d',
              renderItem: renderItems,

        })
      }
      changeSeries(res)
    })
  }

  function renderItems(params, api) {
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
  }

  const getOption = () => {
    let option = {
      dataZoom: [
        {
          type: 'inside', // 内置型数据缩放组件
          xAxisIndex: [0], // 指定缩放影响的 x 轴
          yAxisIndex: [0], // 指定缩放影响的 y 轴
        },
      ],
      // tooltip: {
      //   trigger: 'item', // 触发类型设置为 item，表示鼠标悬浮到数据点上触发
      //   formatter: function (params) {
      //     // params 中包含了悬浮的数据，params.data 包含了 info 数据
      //     return `${params.data[0]} ${params.data[1]}, cat: ${params.data[2] === 1 ? '人物' : params.data[2] === 2 ? '山水' : '花鸟'}` // 显示 info 数据
      //   },
      // },
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
      series: series,
    };
    return option;
  }

  const onclick = {
    'click': (e) => {
      // console.log(e.data)
      const action = change1(e.value);
      dispatch(action)
    }
  }
  

  return (
    <>
      <ReactEcharts
        option = {getOption()}
        notMerge = {true}
        lazyUpdate = {true}
        style = {{width: '100%', height: '100%'}}
        onEvents={onclick}
      />
    </>
  )
}
