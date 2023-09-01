import React, { useState, useEffect } from 'react';

export default function Index () {
    const [Data1, changeData1] = useState([]);
  
    const initialize = () =>
    {
        fetch('./assets/Song_node.json')
        .then(res => res.json())
        .then(Res=>{ 
            var data1 = [];
            data1.push({name: '', num: 0});

            for(var i = 0; i < Res.length; i++)
            {
                var same = false;
                for (var j = 0; j < data1.length;j++)
                    if ( Res[i].class4 === data1[j].name) {
                        same = true;
                        data1[j].num += 1;
                    } else if ( Res[i].class4 === '') {
                        same = true;
                        data1[0].num += 1;
                    }
                if(!same) data1.push({name: Res[i].class4, num: 0});
            }
            changeData1(data1);
        });
    }

    const mprint = () =>
    {
        var res = [];
        res.push("其他");
        for(var i = 0; i < Data1.length; i++) {
            if ( Data1[i].num > 15) 
            {
                res.push(Data1[i].name)
            }
        }
        // console.log(Data1);
        // console.log(res);
    }

  useEffect(() => {    
    initialize();
  }, []) 

  return (
    <>
      <button onClick={mprint}>author</button>
    </>
  )

}