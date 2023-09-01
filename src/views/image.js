import React, {forwardRef, useState, useImperativeHandle, useEffect } from 'react';

const Index = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
		restore, resetBox
	}))
  var img = new Image();
  //选框位置、大小
  const [x, setX] = useState([-10, -10]);
  const [y, setY] = useState([-10,-10]);
  const [mscale, setScale] = useState([1,1]);
  //图片位置、大小
  const [width,setWidth] = useState(350);
  const [pos, setPos] = useState([0, 0]);
  // 父元素宽高
  const w = document.body.clientWidth*0.22;
  const h = document.body.clientHeight*0.66-30;
  // 图片宽高比
  const [s, changeS] = useState(0);
  
  // 滚轮
  const handleZoom = (e)=> {
    if(props.drag) {
      var a = width;
      var x0 = pos[0];
      var y0 = pos[1];
      document.onwheel = () => {
          if (a < 1000 && e.nativeEvent.deltaY <= 0) {
              a += 50;
              x0 -= 25 * s;
              y0 -= 25;
          } else if (a > 200 && e.nativeEvent.deltaY > 0) {
              a -= 50;
              x0 += 25 * s;
              y0 += 25;
          }
          setWidth(a);
          setPos([x0, y0]);
          document.onwheel = null
      }
    }
  }
  // 拖动
  const handleDrag = (e1) => {
    var x0 = pos[0];
    var y0 = pos[1];
    var x1 = e1.clientX;
    var y1 = e1.clientY;
    resetBox();
    document.onmousemove = (e2) => {
      if( e2.offsetX>0 && e2.offsetX<w && e2.offsetY>0 && e2.offsetY<h ) {
        var dx = e2.clientX - x1;
        var dy = e2.clientY - y1;
        if(props.drag) {
          props.setCursor("grabbing");
          var l = x0 + dx;
          var t = y0 + dy;
          setPos([l, t]);
          document.onmouseup = () => {
            props.setCursor("grab");
            document.onmousemove = null
        }} else {
          if(dx >= 0) { setX([x1, null]); } 
          else { setX([null, window.innerWidth - x1]); dx = - dx; }
          if(dy >= 0) { setY([y1, null]); } 
          else { setY([null, window.innerHeight-y1]);  dy = -dy; }
          setScale([dx-5, dy-5]);
          document.onmouseup = () => {
            document.onmousemove = null
          }
        }
      }
    }
  }
  
  //重置位置
  const restore= () => {
    resetBox();
    setWidth(w)
    const hi = w / s;
    setPos([0, (h-hi)*0.5])
  }
  // 重置选框
  const resetBox= () => {
    setScale([1, 1]);
    setX(-10, null);
    setY(-10, null);
  }

  useEffect(()=>{
    img.src = props.url;
    changeS(img.width/img.height);
    restore();resetBox();
    img.src = props.url;
    changeS(img.width/img.height);
    restore();resetBox();
  },[props.url])

  return (
    <>
      <div style={{display:"flex",flexDirection:"column"}}>
        <div style={{height:30}}>{props.title}</div>
      
        <div style={{height:(document.body.clientHeight*0.66-30),overflow:"hidden"}} >
          <div style={{
            position:"absolute",
            backgroundColor:"rgba(255, 255, 255, 0.3",
            border: "2px dashed #111",
            left: x[0],
            top: y[0],
            right: x[1],
            bottom: y[1],
            width: mscale[0],
            height: mscale[1],
            zIndex: 50
          }}/>
          <img
            id='img'
            src={props.url}
            style={{
              position: "relative",
              cursor: props.cursor,
              left: pos[0],
              top: pos[1],
            }}
            width={width}
            draggable="false"
            alt=''
            onWheel={handleZoom}
            onMouseDown={handleDrag}
          />
        </div>
      </div>
    </>
  );
});

export default Index;

