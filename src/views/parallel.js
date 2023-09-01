import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';

const schema = [
  { name: 'mediaType', index: 0, text: '材料' },
  { name: 'styleType', index: 1, text: '形制' },
  { name: 'class1', index: 2, text: '题材' },
  { name: 'class2', index: 3, text: '类型' },
  { name: 'class3', index: 4, text: '主题' },
  { name: 'skill', index: 5, text: '笔法' },
  { name: 'materialType', index: 6, text: '设色' },
];

const authors = [ '其他', '法常', '李迪', '刘松年', '马麟', '夏圭', '范宽', '马远', '易元吉', '郭熙', '郭羽', '李成', 
'李公麟', '李嵩', '李唐', '梁楷', '林椿', '马和之', '苏汉臣', '燕文贵', '赵伯驹', '赵昌', '赵佶' ];

const lineStyle = {
  width: 1,
  opacity: 0.1
};

export default function Parallel () {
  const [Series, changeSeries] = useState([]);

  const initialize = () =>
  {
    var i,j;
    fetch('./assets/song/Song_node.json').then(res => res.json()).then(Res=>{ 
      var data = [];
      var same = false;
      for(i=0; i < authors.length;i++) {
        data[i] = [];
      }
      for(i = 0; i < Res.length; i++) {
        same = false;
        for(j=0; j < authors.length;j++)  
          if(Res[i].authorName_change === authors[j]) { same = true; break;}
        if(same) data[j].push([Res[i].mediaType, Res[i].styleType,Res[i].class1,Res[i].class2,Res[i].class3,Res[i].skill,Res[i].materialType, Res[i].workName,Res[i].authorName_change ]);
        else data[0].push([Res[i].mediaType, Res[i].styleType,Res[i].class1,Res[i].class2,Res[i].class3,Res[i].skill,Res[i].materialType, Res[i].workName,Res[i].authorName_change ]);
      }
      // console.log(data);

      var res = [];
      for(i = 0; i < authors.length; i++)
      {
        res.push({
          name: authors[i],
          type: 'parallel',
          lineStyle: lineStyle,
          inactiveOpacity: 0 ,
          activeOpacity: 1,
          progressive: 100,
          smooth: true,
          data: data[i],
          emphasis: {
            focus: 'adjacency',
          }
        });
      }
      // console.log(res);
      changeSeries(res);
    });

    
  }

  useEffect(() => {    
    initialize();
  }, []) 

  const getOption = () => {
    let option = {
      // backgroundColor: '#111',
      legend: {
        type: "scroll",
        bottom: 10,
        data: authors,
        itemGap: 20,
        textStyle: {
          color: '#111',
          fontSize: 12
        }
      },
      parallelAxis: [
        { dim: 0, name: schema[0].text, type: 'category', axisLabel: {fontSize: 10}, textStyle: {fontSize: 12},data: [ '','纸本', '绢本' ] },
        { dim: 1, name: schema[1].text, type: 'category', axisLabel: {fontSize: 10}, data: ['','立轴','册页','镜片','长卷','扇面'] },
        { dim: 2, name: schema[2].text, type: 'category', axisLabel: {fontSize: 10}, data: [ '','山水', '花鸟', '人物' ] },
        { dim: 3, name: schema[3].text, type: 'category', axisLabel: {fontSize: 10}, data: ['','兼工带写','写意', '工笔',]},
        { dim: 4, name: schema[4].text, type: 'category', axisLabel: {fontSize: 8}, textStyle: {fontSize: 10},
          data: ['其他', '动物类', '自然景观', '历史故事', '高士', '风俗', '行旅', '隐逸', '待渡', '植物类', '道释', '屋木舟车', '仕女', '雅集', '肖像']},
        { dim: 5, name: schema[5].text, type: 'category', axisLabel: {fontSize: 9}, textStyle: {fontSize: 10},
          data: [ '', '斧劈皴,拖泥带水皴', '钉头鼠尾描', '减笔描', '斧劈皴', '工笔重彩法', '没骨法', '铁线描', '高古游丝描', '琴弦描', '兼工带写法', '牛毛皴', '雨点皴', '披麻皴', '拖泥带水皴', '曹衣描', '工笔淡彩法', '卷云皴', '浓淡相间法', '米点皴', '工笔淡彩法,工笔重彩法']},
        { dim: 6, name: schema[6].text, type: 'category', axisLabel: {fontSize: 10}, data: [ '','淡彩-螺青', '淡彩', '水墨', '吴妆', '设色', '浅设色' ] },
      ], 
      tooltip: {
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#777',
        borderWidth: 1
      },
      parallel: {
        left: 20,
        right: 80,
        top: 40,
        bottom: 40,
        // layout: 'vertical',
        parallelAxisDefault: {
          type: 'value',
          name: 'nutrients',
          nameLocation: 'end',
          nameGap: 18,
          nameTextStyle: {
            color: '#111',
            fontSize: 12
          },
          axisLine: {
            lineStyle: {
              color: '#111'
            }
          },
          axisTick: {
            lineStyle: {
              color: '333'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#111'
          },
          realtime: false
        }
      },
      series: Series
    };
    return option;
  }

  return (
    <>
      <ReactEcharts 
        option={getOption()}
        notMerge={true}
        lazyUpdate={true}
        style={{width: '100%',height:'95%'}}
      />
    </>
  )

}