import React, { forwardRef, useState, useImperativeHandle, } from 'react'
 
/*拖拽组件*/
const Drag = forwardRef((props, ref) => {
	const [pos, setPos] = useState([800, 200]);
	const [cursor, setCursor] = useState("grab");
	
	const [mini, toggle] = useState(false);
	useImperativeHandle(ref, () => ({
		toggle
	  }))

	const handleDrag = (e1) => {
		var x0 = pos[0];
		var y0 = pos[1];
		var x1 = e1.pageX;
		var y1 = e1.pageY;
		const w = document.body.clientWidth;
		const h = document.body.clientHeight;
		document.onmousemove = (e2) => {
			if( e2.pageX< w && e2.pageX>0 && e2.pageY>0 && e2.pageY<h ) {
				var dx = e2.pageX - x1;
				var dy = e2.pageY - y1;
				setCursor("grabbing");
				var l = x0 + dx;
				var t = y0 + dy;
				setPos([l, t]);
				document.onmouseup = () => {
					setCursor("grab");
					document.onmousemove = null
				}
			}
		}
	}

	return (
		<div 
			style={mini?{
				border:"2px solid #666",borderRadius:"5px",
				width: props.style.width,
				height: props.style.height+25,
				backgroundColor: "#fff",
				position:"absolute",
				left: pos[0],
				top: pos[1],
				overflow:"hidden",
				// transform: `translate(${this.state.needX}px, ${this.state.needY}px)`,
				
			}:{
				border:"3px solid #111",borderRadius:"5px",
				width: 200,
				height: 20,
				backgroundColor: "#fff",
				position:"absolute",
				left: pos[0],
				top: pos[1],
				overflow:"hidden",
			}}>
			<div style={{width: "100%", height:'20px',backgroundColor:'#666',color:"#fff",cursor: cursor,}} onMouseDown={handleDrag}>
				{props.name}</div>
			<div style={{padding:'0px 8px',position:"absolute", top:0,width:10,color:"#fff",fontSize:30,top:-15}} onClick={()=>toggle(!mini)}>
				<b>{mini?'-':'+'}</b>
			</div>
			{props.children}
		</div>
			
	)
})
export default Drag