
const data1 = ["name1", "Ma Yuan","Song", "paperForm","scroll","conbined", "landscape","natural scenary", "ink and wash" ];
const data2 = ["name2", "Ma Yuan","Song", "paperForm","scroll","conbined", "landscape","natural scenary", "ink and wash" ];

export default function Index () {

    return (
        <div style={{height:"100%",fontSize:13,columnCount:3,textAlign:"left",padding:"10px"}} >
            <div>
                <b>Name<br/>Author<br/>Dynasty<br/>Material<br/>vertical<br/>style<br/>Subject<br/>Theme<br/>Color</b>
            </div>
            
            <div>
                {data1.map(item => <li>{item}</li>)}
            </div>

            <div>
                {data2.map(item => <li>{item}</li>)}
            </div>
            
        </div>
    )
}