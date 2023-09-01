
import './App.css';
import Graph from './views/graph';
import Parallel from './views/parallel';
import Neighbor from './views/neighbor';
import Viewer from './views/viewer';
import Authors from './views/authors'
import React, {useState} from 'react';
import Drag from './views/dragBox';
import Detail from './views/detail';

function App() {
  const [isOpen, setOpen] = useState(false);
  const infroRef = React.useRef(null);
  const open = ()=> {
    setOpen(!isOpen);
    infroRef.current.toggle(true);
  }
  return (
    <div className="App">
      <div className='container'>
        <div className="item item1">
          <Viewer open={open} />
        </div>
        <div className="item item2">
          {/* <Graph /> */}
        </div>
        <div className="item item3">
          <Authors />
          
        </div>
      </div>
      
      <div style={isOpen?{display:"block"}:{display:"none"}}>
        <Drag style={{height:180,width:400}} name={'Detail information'} ref={infroRef} >
          <Detail />
        </Drag>
      </div>

      <Drag style={{height:300,width:300}} name={"References"} >
          <Neighbor />
      </Drag>

      <Drag style={{width:500,height:400}} name={"Graph"} >
          <Graph /> 
      </Drag>

      <Drag style={{width:700,height:300}} name={"Parallel"} >
        <Parallel />
      </Drag>
    </div>
  );
}

export default App;
