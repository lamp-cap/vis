import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';

const categories = [{name: "真"},{name: "假"}];

const Graph = () => {
    const [count, add] = useState(0);
    const [isClick, clickIt] = useState([false,false,false,false,false,false,false,false,false]);
    const [Link, changeLink] = useState([]);
    const [Data, changeData] = useState([]);
    const [isOpen, open] = useState(false);

    const initialize = ()=> {
        fetch('./assets/mayuan/MaYuan_node.json')
        .then(res1 => res1.json())
        .then(json=>{
            var res = [];
            for(var i = 0; i < json.length; i++)
                res[i] = {
                    id: i,
                    name:[json[i].dynasty, json[i].authorName, json[i].author,json[i].workName,json[i].mediaType,json[i].styleType,json[i].class1,json[i].class2,json[i].class3,json[i].skill,json[i].materialType].toString(),
                    category:  (json[i].fake === '1') ? "假" : "真",
                }
            changeData(res)
            // console.log(Data);
        });
    }

    useEffect(() => {    
        initialize();
    }, []) 

    const clickButton = (i,url) => {
        if(i === 8) {
            changeLink([]);
            clickIt([false,false,false,false,false,false,false,false,false]);
        }else {
            if(!isClick[i]){var res = isClick;
            res[i] = true;
            clickIt(res);
            fetch(url)
            .then(res => res.json())
            .then(json=>{
                const array2 = json;
                const array1 = Link.concat(array2);
                changeLink(array1);
            });
            add(count+1);}
        }
    }

    const buttons = [
        { id: 0, name: "材料", color: "", url:'' },
        { id: 1, name: "形制", color: "rgb(0,40,220)",      url:'./assets/mayuan/MaYuan_link_style.json' },
        { id: 2, name: "题材", color: "rgb(230, 120, 230)", url:'' },
        { id: 3, name: "类型", color: "rgb(240,130,0)",     url:'./assets/mayuan/MaYuan_link_class2.json' },
        { id: 4, name: "主题", color: "rgb(70, 110, 230)",  url:'./assets/mayuan/MaYuan_link_class3.json' },
        { id: 5, name: "技法", color: "rgb(10,220,170)",    url:'./assets/mayuan/MaYuan_link_skill.json' },
        { id: 6, name: "设色", color: "", url:'' },
        { id: 7, name: "作者", color: "rgb(250,120,0)",     url:'' },
        { id: 8, name: "重置", color: "", url:'' },
    ]

    const getOption = ()=>{

        let option = {
            title: {
                //title
                text: 'Referer of a Website',
                //subtitle
                subtext: 'Song Data',
                //align
                left: 'center'
            },
            //点击提示标签
            tooltip: {
                trigger: 'item',
            },
            // toolbox : {
            //     // 显示工具箱
            //     show: true,
            //     feature: {
            //         mark: { show: true },
            //         // 还原
            //         restore: { show: true },
            //         // 保存为图片
            //         saveAsImage: { show: true }
            //     }
            // },
            //图例文字展示
            legend: {
                //图例显示在底部
                bottom:0,
                //图例背景颜色
                backgroundColor:"transparent",
                // 图例标记的图形宽度。[ default: 25 ]
                itemWidth:12,
                // 图例标记的图形高度。[ default: 14 ]
                itemHeight:9,
                orient: 'vertical',
                left: 'left'
            },
            //提示标签文本
            series: [
                {
                    type: 'graph', // 类型:关系图
                    layout: 'force', //图的布局，类型为力导图
                    symbolSize: 3, // 调整节点的大小
                    roam: true, // 是否开启鼠标缩放和平移漫游
                    autoCurveness: true,
                    force: {
                        repulsion: 20,
                        edgeLength: [10, 50]
                    },
                    // draggable: true,
                    lineStyle: {
                        normal: {
                            width: 1,
                            color: '#4b565b',
                        }
                    },  
                    // 数据
                    data: Data,
                    links: Link,
                    categories: categories,
                    inactiveOpacity: 0,
                    activeOpacity: 1,
                    emphasis: {
                        focus: 'adjacency',
                    },
                    select:{
                        itemStyle: {
                            borderType: "solid",
                            borderWidth: 5
                        }
                    },
                    selectedMode: true,
                }
            ]
        };
        return option;
    };

    return (
        <>
            <ReactEcharts 
                option={getOption()}
                notMerge={true}
                lazyUpdate={true}
                style={{width: '100%',height:'90%'}}
            />
            <div onMouseEnter={()=>open(true)} onMouseLeave={()=>open(false)}>
                <div style={isOpen?
                {position:"relative",top:-15,backgroundColor:"#fff",zIndex:"100",transition:"0.3s",overflow:"hidden",padding:"5px 60px",display:"flex",justifyContent:"space-around"}
                :{position:"relative",top:20,backgroundColor:"#fff",zIndex:"100",transition:"0.3s",overflow:"hidden",padding:"5px 60px",display:"flex",justifyContent:"space-around"}}>
                    {buttons.map(item =>
                        <button key={item.id} onClick={()=>clickButton(item.id, item.url)} style={isClick[item.id]?{backgroundColor:item.color, color:"#fff"}:null}>
                            {item.name}
                    </button>)}
                </div>
                <div style={{height:"20px",position:"relative",top:-40,textAlign:"center", transition:"300ms"}}>
                        <div style={{transform:'matrix(-1.5, 0, 0, -0.6, 0, 0'}}>V</div>
                </div>
            </div>
            
        </>
    )
}

export default Graph;