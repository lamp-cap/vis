import React, {forwardRef, useState, useImperativeHandle, useEffect } from 'react';

const Index = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
		restore, resetBox
	}))
  //选框位置、大小
  const [x, setX] = useState(-20);
  const [y, setY] = useState(-20);
  const [mscale, setScale] = useState([1,1]);
  //图片位置、大小
  const [width,setWidth] = useState(350);
  const [pos, setPos] = useState([0, 0]);
  // 父元素宽高
  const w = document.body.clientWidth*0.22;
  const h = document.body.clientHeight*0.65-30;
  // 图片宽高比
  const [s, changeS] = useState(1);
  const [data,refreshData]=useState([
    {data : [ 0.490605, 0.761304, 0.05428, 0.05152],
    id: "人物"},
    {data : [0.54071, 0.743765, 0.091858, 0.055906],
    id: "人物"},
    {data:  [0.322547, 0.640175, 0.498956, 0.38586],
    id: "树木"},
    {data: [0.109603, 0.658263, 0.173278, 0.277336],
    id: "树木"},
    {data: [0.541754, 0.89504, 0.444676, 0.15237],
    id: "山石"},
    {data : [0.779749, 0.867635, 0.356994, 0.141408],
    id: "树木"},
    {data: [0.482255, 0.282269, 0.446764, 0.294876],
    id: "山石"},
    {data: [0.916493, 0.315155, 0.050104, 0.029598],
    id: "月"},
    {data: [0.506785, 0.050425, 0.088726, 0.043848],
    id: "印章" },
    {data: [0.024008, 0.956426, 0.03549, 0.025212],
    id: "印章"},
    {data: [0.022443, 0.985475, 0.026096, 0.020828],
    id: "印章"},
  ]);
  const [bboxes, refresh]=useState();
  
  // 滚轮
  const handleZoom = (e)=> {
    if(props.drag) {
      var a = width;
      var x0 = pos[0];
      var y0 = pos[1];
      document.onwheel = () => {
          if (a < 1500 && e.nativeEvent.deltaY <= 0) {
              a += 40;
              x0 -= 10;
              y0 -= 20 * s;
          } else if (a > 100 && e.nativeEvent.deltaY > 0) {
              a -= 40;
              x0 += 10;
              y0 += 20 * s;
          }
          setWidth(a);
          setPos([x0, y0]);
          document.onwheel = null
      }
    }
  }
  // 拖动
  const handleDrag = (e) => {
    document.onmousedown = (e1)=>{
      var x0 = pos[0];
      var y0 = pos[1];
      var x1 = e1.offsetX;
      var y1 = e1.offsetY;
      var x2 = e1.clientX;
      var y2 = e1.clientY;
      // console.log(x1)
      resetBox();
      document.onmousemove = (e2) => {
        // console.log(e2.offsetX)
        if( e2.clientX>50 && e2.clientX<w*2 && e2.clientY>50 && e2.clientY<h+50 ) {
          var dx = e2.clientX - x2;
          var dy = e2.clientY - y2;
          if(props.drag) {
            props.setCursor("grabbing");
            var l = x0 + dx;
            var t = y0 + dy;
            setPos([l, t]);
            document.onmouseup = () => {
              props.setCursor("grab");
              document.onmousemove = null
          }} else {
            if(dx >= 0) { setX(x1); } 
            else { 
              setX(x1+dx+2); 
              dx = - dx; 
            }
            if(dy >= 0) { setY(y1); } 
            else { 
              setY(y1+dy+2); 
              dy = -dy; 
            }
            setScale([dx-5, dy]);
            document.onmouseup = () => {
              document.onmousemove = null
            }
          }
        }
      }
    
    }
  }
  
  //重置位置
  const restore= () => {
    resetBox();
    if(s>1)
    {
      setWidth(w)
      const hi = w * s;
      setPos([0, (h-hi)*0.5])
    } else {
      var wi = h / s;
      setWidth(wi);
      setPos([(w-wi)*0.5, 0])
    }
    
  }
  // 重置选框
  const resetBox= () => {
    setScale([1, 1]);
    setX(-20, null);
    setY(-20, null);
  }

  const bbox2 = (w, h) => {
    var res = <>
      {data.map(item=>
      <div style={{
        position:"absolute",
        border: "1px solid #f11",
        left:pos[0]+(item.data[0]-item.data[2]/2)*w,
        top:pos[1]+(item.data[1]-item.data[3]/2)*h,
        width:(item.data[2])*w,
        height:(item.data[3])*h,
      }}/>)}
    </>
    // console.log(w,h)
    refresh(res)
  }

  useEffect(()=>{
    bbox2(width,width*s);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pos, width, props.url,s,])

  const newData= ()=> {
    fetch('./assets/paintings/Mayuan_bbox.json').then(res => res.json()).then(json=>{
      var data = json[props.id];
      if(data){
        var res = []
        for(var i=0; i < data.length; i++) {
          res.push({
            id:data[i].object[0]?data[i].object[0]:0,
            data:data[i].bbox
          })
        }
        refreshData(res)
        console.log(res);
      }
    });
  }

  useEffect(()=>{
    var img = new Image();
    img.src = props.url;
    img.onload = function () {
      var st = img.height/img.width;
      changeS(st);
      restore();
    };
    newData();
  },[props.url])

  return (
    <>
      <div style={{display:"flex",flexDirection:"column"}}>
        <div style={{height:30}}>{props.title}</div>
      
        <div style={{height:(document.body.clientHeight*0.66-30),position:"relative",overflow:"hidden"}} 
            onWheel={handleZoom}
            onMouseDown={handleDrag} >
          <img
            id={props.title}
            src={props.url}
            style={{
              position: "relative",
              cursor: props.cursor,
              left: pos[0],
              top: pos[1],
              width:width
            }}
            draggable="false"
            alt=''
          />
          {bboxes}
          <div style={{
            position:"absolute",
            backgroundColor:"rgba(255, 255, 255, 0.3",
            border: "2px dashed #111",
            left: x,
            top: y,
            width: mscale[0],
            height: mscale[1],
          }}/>
        </div>
      </div>
    </>
  );
});
export default Index;
