import React, {useEffect, useState} from 'react';
import { useSelector} from 'react-redux';
import Img from './image';
import Img1 from './neighbor/img5.png';

const Index = (props) => {
  const { dataList1 } = useSelector(state => state.data1);
  const [ url, changeUrl ] = useState(Img1);
  const imgPath = require.context('./images/', true, /\.png$/);
  const paths = imgPath.keys();

  const img1Ref = React.useRef(null);
  const img2Ref = React.useRef(null);
  const [drag, switchState] = useState(true);
  const [cursor, setCursor] = useState("default");
  // 切换 drag | select
  const mswitch = () => {
    img1Ref.current.resetBox();
    img2Ref.current.resetBox();
    switchState(!drag);
    if(drag) 
      setCursor("crosshair");
    else
      setCursor("grab");
  }
  const restore =()=>{
    img1Ref.current.restore();
    img2Ref.current.restore();
  }
  useEffect(()=>{
    for(var i=0;i<paths.length;i++)
    {
      if(paths[i].search(dataList1) !== -1)
      changeUrl(imgPath(paths[i]))
    }
  },[dataList1, imgPath, paths])
  return (
    <>
      <div style={{display:"flex"}}>
        <div style={{height:"66vh", width:"4.5vw", backgroundColor:"#666", display:"flex", flexDirection:"column",justifyContent:"space-around",alignItems:"center",color:"white"}}>
          <div style={{height:"60%",display:"flex", flexDirection:"column",justifyContent:"space-around"}}>
            <div style={{height:"3vw",width:"3vw",borderRadius:"5px",border: "2px solid #fff"}} onClick={mswitch}>{drag?"Drag":"Select"}</div>
            <div style={{height:"3vw",width:"3vw",borderRadius:"5px",border: "2px solid #fff"}} onClick={restore}>重置</div>
            <div style={{height:"3vw",width:"3vw",borderRadius:"5px",border: "2px solid #fff"}} onClick={props.open}>V</div>
          </div>
          <div>
            <div style={{height:"3vw",width:"3vw",borderRadius:"5px",border: "2px solid #fff"}}>
              <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" />
            </div>
          </div>
        </div>
        <div style={{columnCount:2, width:"44vw",height:"66vh", backgroundColor:"#fff", columnGap:"1px"}}>
          <Img url={Img1} title={"title1"} ref={img1Ref} drag={drag} cursor={cursor} setCursor={setCursor}/>
          <Img url={url}  title={"title2"} ref={img2Ref} drag={drag} cursor={cursor} setCursor={setCursor} id={dataList1}/>
        </div>
      </div>
      
    </>
  );
};

export default Index;

