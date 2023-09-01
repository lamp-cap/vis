import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

const province = ['广西', '上海', '江苏', '河北', '山西', '江西', '浙江', '意大利', '湖南', '安徽', '福建', '四川', '天津', '山东', '北京', '河南', '湖北', '陕西', '辽宁', '广东', '新疆', '内蒙古', '贵州', '甘肃'];

export default function Graph () {
    const [data, changeData] = useState([]);
    useEffect(()=>{
        initialize();
    },[])

    const initialize = ()=> {
        fetch('./assets/authors/authorLife.json')
        .then(res => res.json())
        .then(json=>{
            var res = [];
            for(var i = 0; i < json.length; i++){
                var pro; 
                for(var j=0; j<24; j++) {
                    if (json[i].province === province[j])
                    {
                        pro = j;
                    }
                }
                var birthTime = parseInt(json[i].birth, 10);
                var deathTime = parseInt(json[i].death, 10);
                res[i] = {
                    name: json[i].authorName,
                    value: [pro, birthTime, deathTime, (deathTime-birthTime),json[i].province,json[i].introduction],
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

    function renderItem(params, api) {
        var Index = api.value(0);
        var start = api.coord([api.value(1), Index]);
        var end = api.coord([api.value(2), Index]);
        var height = api.size([0, 1])[1] * 0.6;
        var rectShape = echarts['graphic'].clipRectByRect(
        {
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
        },
        {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
        }
        );
        return (
        rectShape && {
            type: 'rect',
            transition: ['shape'],
            shape: rectShape,
            style: api.style()
        }
        );
    }

    const getOption = ()=>{

        let option = {
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                  return params.marker+params.name+': '+params.value[1]+' - '+params.value[2]+' '+params.value[4];
                },
                textStyle: {
                    width: 400,
                    overflow: 'break'
                }
              },
              dataZoom: [
                {
                  type: 'inside',
                  filterMode: 'filter',
                  showDataShadow: false,
                  top: 500,
                  labelFormatter: ''
                },
                {
                  type: 'inside',
                  filterMode: 'weakFilter'
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
                  renderItem: renderItem,
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
    
  return (
    <>
      <ReactEcharts 
        option={getOption()}
        notMerge={true}
        lazyUpdate={true}
        style={{width: '100%',height:'100%'}}
      />
    </>
  )
}