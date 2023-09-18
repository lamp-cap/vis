import Img1 from "./img1.png";
import Img2 from "./img2.png";
import Img3 from "./img3.jpg";
import Img4 from "./img4.jpg";
import Img5 from "./img5.png";
import Img6 from "./2gverg.jpg";
import Img7 from "./3170e20.jpeg";
import Img8 from "./5974e96b3ac8a6560.jpg";
import Img9 from "./81758c516464761b.jpeg";
import Img10 from "./b7d2ec60f97dd779b051259b67.jpeg";
import Img11 from "./b5ca2dfac.jpeg";
import Img12 from "./5cc556172147384.jpg";
import Img13 from "./76b0ec63eaa23653.jpg";
import Img14 from "./938ad.jpeg";
import Img15 from "./fe7ee3de792rk.jpg";
import { useDispatch } from 'react-redux';
import { changeUrl } from "../../store/referImgUrl"

const neighbors = [
  { id: 0, name: '同作者'},
  { id: 1, name: '同朝代'},
  { id: 2, name: '同内容'},
  { id: 3, name: '同材料'},
  { id: 4, name: '同技法'},
  { id: 5, name: '同题材'},
]

const examples = [
  [{id: 11, url: Img1}, {id: 12, url: Img2}, {id: 13, url: Img3}, {id: 14, url: Img4}, {id: 15, url: Img5}, {id: 16, url: Img6}],
  [{id: 21, url: Img11}, {id: 22, url: Img13}, {id: 23, url: Img9}, {id: 24, url: Img8}, {id: 25, url: Img7}, {id: 26, url: Img2}, {id: 27, url: Img3},],
  [{id: 31, url: Img6}, {id: 32, url: Img7}, {id: 33, url: Img8}, {id: 34, url: Img10}, {id: 35, url: Img10}],
  [{id: 41, url: Img9}, {id: 42, url: Img4}, {id: 43, url: Img3}, {id: 44, url: Img5}, {id: 45, url: Img4}, {id: 46, url: Img2}, {id: 47, url: Img3},],
  [{id: 51, url: Img15}, {id: 52, url: Img12}, {id: 53, url: Img11}, {id: 54, url: Img4}, {id: 55, url: Img11}],
  [{id: 61, url: Img10}, {id: 62, url: Img14}, {id: 63, url: Img13}, {id: 64, url: Img15}, {id: 65, url: Img5}, {id: 66, url: Img2}, {id: 67, url: Img3},],
]


export default  function Index () {
  const dispatch = useDispatch()
  function clickEvent (url) {
    const action = changeUrl(url);
    dispatch(action)
  }

  function exampleImage(x) {
    return <div style={{height:"94px", width:"90%",overflowY:"hidden",overflowX:"auto"}}>
      <div style={{width:"430px",height:"70px",textAlign:"left"}}>
        {examples[x].map(item =>
            <div className="neighbor"
              key={item.id}
              style={{
                width:"60px", height:"80px", margin:"0 5px", overflow:"hidden", float:"left",
                backgroundImage: `url(${item.url})`, backgroundSize: "cover", transition:"transform 0.3s"}} 
              draggable="false"
              onClick = {()=>clickEvent(item.url)}
            />)}</div>
    </div>
  }
    return (
      <div style={{width:"100%",height:"100%",overflowY: "scroll",overflowX: "hidden"}}><br/>
        {
          neighbors.map(item => 
          <>
            <div key={item.id} style={{height:"70px",width:"100%",padding: "0 5px", display:"flex",justifyContent:"space-around",alignItems:'center',overflow:"hidden"}}>
              <div style={{width:"5%"}}>{item.name}</div>
              {exampleImage(item.id)}
            </div>
            <hr/>
          </>) 
        }
      </div>
    )
}
