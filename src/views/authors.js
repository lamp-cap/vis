import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import Img from './asd.png'
import { useDispatch } from 'react-redux';
import { change2 } from "../store/data2";

export default function Graph () {
    const [data, changeData] = useState([]);
    useEffect(()=>{
        initialize();
    },[])
    const dispatch = useDispatch();
    const initialize = ()=> {
        fetch('./assets/authors/authorLife.json')
        .then(res => res.json())
        .then(json=>{
            var res = [];
            for(var i = 0; i < json.length; i++){
                var pro = Math.random() * 10; 
                var birthTime = parseInt(json[i].birth, 10);
                var deathTime = parseInt(json[i].death, 10);
                res[i] = {
                    name: json[i].authorName,
                    value: [pro, birthTime, deathTime, (deathTime-birthTime),json[i].province, json[i].workNum+1],
                    itemStyle: {
                        normal: {
                            color: "#7b9ce1"
                        }},
                    intro: json[i].introduction
                }
            }
            changeData(res)
        }); 
        
        // console.log(data)
    }

    function renderItem1(params, api) {
        var Index = api.value(0);
        var start = api.coord([api.value(1), Index]);
        var end = api.coord([api.value(2), Index + Math.sqrt(api.value(5)) * 0.05]);
        var width = end[0] - start[0];
        var height = end[1] - start[1];
        
        return (
        {
          type: 'image',
          x: start[0],
          y: start[1],
          transition: ['shape'],
          style: {
            image: Img,
            x: 0,
            y: -height/2,
            width: width,
            height: height,
            opacity: 0.5,
          }
        }
        );
    }
    function renderItem2(params, api) {
      var start = api.coord([api.value(1), api.value(0)]);
      var end = api.coord([api.value(2), api.value(0) + Math.sqrt(api.value(5)) * 0.05]);
      var width = end[0] - start[0];
      var height = end[1] - start[1];
      var radius = height;
      
      return (
      {
        type: 'circle',
        x: start[0] + width/2,
        y: start[1],
        scaleX: radius* 0.2,
        scaleY: radius* 0.2,
        transition: ['shape'],
        z2: 10,
        shape: {
          r: 1,
        },
        style: {
          fill: '#eee',
          lineWidth: 10,
          opacity: 0.6,
        },
      }
      );
  }

    const getOption = ()=>{

        let option = {
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                  return params.name+': '+params.value[1]+' - '+params.value[2]+' '+params.value[4];
                },
                textStyle: {
                    width: 400,
                    overflow: 'break'
                }
              },
              dataZoom: [
                {
                  type: 'inside',
                  filterMode: 'none',
                  xAxisIndex: [0],
                  showDataShadow: false,
                  top: 500,
                  labelFormatter: ''
                },
                {
                  type: 'slider',
                  filterMode: 'none',
                  yAxisIndex: [0],
                }
              ],
              grid: {
                left: -10,
                right: -20,
                top: 0,
                bottom: 20,
              },
              xAxis: {
                min: 200,
                scale: true,
                axisLabel: {
                  formatter: function (val) {
                    return Math.max(0, val);
                  }
                }
              },
              yAxis: {
                // data: province,
                // axisLabel: {
                //     fontSize: 9
                // }
              },
              series: [
                {
                  type: 'custom',
                  renderItem: renderItem1,
                  itemStyle: {
                    opacity: 0.2,
                    borderColor: '#000',
                    borderWidth: 1,
                    borderType: 'solid',

                  },
                  encode: {
                    x: [1, 2],
                    y: 0,
                    tooltip: 4
                  },
                  data: data
                },
                {
                  type: 'custom',
                  renderItem: renderItem2,
                  itemStyle: {
                    opacity: 0.2,
                    borderColor: '#000',
                    borderWidth: 1,
                    borderType: 'solid',

                  },
                  encode: {
                    x: [1, 2],
                    y: 0,
                    tooltip: 4
                  },
                  data: data
                }
              ]
        };
        return option;
    }
    const onclick = {
      'click': (e) => {
        // console.log(e.data.intro)
        const action = change2(e.data.intro);
        dispatch(action)
      }
    }
    
  return (
    <>
      <ReactEcharts 
        option={getOption()}
        notMerge={true}
        lazyUpdate={true}
        style={{width: '100%',height:'100%'}}
        onEvents={onclick}
      />
    </>
  )
}
