import React, { useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react';
import { useSelector} from 'react-redux';

const MaYuan_bbox = require('./MaYuan_bbox.json');
let xData = [];
let yData = [];
let data = [];
let heatdata = [];

const maxHeat = 20;

export default function Heatmap () {
  const { dataList1 } = useSelector(state => state.data1);
  const [series, changeSeries] = useState([]);
  // imageID 需要通过交互输入
  const [imageID, changeID] = useState('69e7d8ae-4070-11ed-9adc-c934f75048ef');
  useEffect(() => {
    changeID(dataList1);
    console.log(imageID);
    
    initialize();
  },[dataList1])

  useEffect(() => {
  },[])

  const initialize = () => {
    fetch('./assets/MaYuan_heat.json')
    .then(res => res.json())
    .then(json => {
      heatdata = json;
      // console.log(heatdata)
      
      // bbox: 该物体在热力图上赋最大值
      var imageJson = MaYuan_bbox[imageID];
      for (var area_id in imageJson){
        var area = imageJson[area_id]
        for (var ob_id in area['object']){
          var object = area['object'][ob_id]
          if (object === '印章'){
            var bbox = area['bbox'];
            // console.log(bbox);
            var x = bbox[0], y = bbox[1], w = bbox[2], h = bbox[3];
            console.log(x, y, w, h);
            var istart = Math.floor((x - w / 2) * 100);
            var iend = Math.min(Math.ceil((x + w / 2) * 100), 100);
            var jstart = Math.floor((1 - y - h / 2) * 100);
            var jend = Math.min(Math.ceil((1 - y + h / 2) * 100), 100);
            for (var i = istart; i < iend; i++){
              for (var j = jstart; j < jend; j++){
                heatdata[i][j] = maxHeat;
              }
            }
          }
        }
      }

      data = [];
      for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
          // console.log(heatdata[i][j])
          data.push([i, j, heatdata[i][j]]);
        }
        xData.push(i);
      }
      for (let j = 0; j < 100; j++) {
        yData.push(j);
      }
      

      var res = [];
      res.push({
        type: 'heatmap',
        data: data,
        emphasis: {
          itemStyle: {
            borderColor: '#333',
            borderWidth: 1
          }
        },
        progressive: 1000,
        animation: false
      })
      changeSeries(res)
    })
  }

  const getOption = () => {
    let option = {
      xAxis: {
        type: 'category',
        show: false,
      },
      yAxis: {
        type: 'category',
        show: false,
      },
      visualMap: {
        min: 0,
        max: maxHeat,
        show: false,
        inRange: {
          color: [
            // '#313695',
            // '#4575b4',
            // '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026'
          ]
        }
      },
      series: series,
    };
    return option;
  }

  return (
    <>
      <ReactEcharts
        option = {getOption()}
        notMerge = {true}
        lazyUpdate = {true}
        silent ={true}
        style = {{width: '100%', height: '100%'}}
        // onEvents={onclick}
      />
    </>
  )
}