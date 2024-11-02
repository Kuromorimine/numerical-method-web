import { compile } from "mathjs";
import { useState } from "react";

import Plot from 'react-plotly.js'
function SecantMain(Rangex0,Rangex1,Epsilon, Fn){
    const fn=compile(Fn);
    
    let x0=Rangex0,x1=Rangex1,xi=Rangex1,xiold,iter=0,ans;
    
    var dataXset=[],dataYset=[];
    do{
        xiold=xi;
        xi=x0-(((fn.evaluate({x:x0}))*(x0-x1))/((fn.evaluate({x:x0}))-(fn.evaluate({x:x1}))));
        x0=x1;
        x1=xi;
        iter++;
        //console.log(xi);
        //console.log(xiold);
        //console.log(Math.abs((xi-xiold)/xi)*100);
        dataXset.push(x1);
        dataYset.push(fn.evaluate({x:x1}));
    }while(Math.abs((xi-xiold)/xi)*100>Epsilon);
    //console.log(xi);
    ans=x1;
    return {ans,dataXset,dataYset};

}
// function(dataXset){
// return dataXset;
// }
// function(dataYset){
// re
// }
function Secant(){
    const [Ans, setAns] = useState(null);
    const [FnState, setFn] = useState("");
    const [Rangex0, setRangex0] = useState("");
    const [Rangex1, setRangex1] = useState("");
    const [Epsilon, setEpsilon] = useState("");
    const [dataX,setdataX]=useState(null);
    const [dataY,setdataY]=useState(null);
    function eventHandler(e) {
        e.preventDefault();
        console.log(Rangex0);
        console.log(Rangex1);
        
        const result = SecantMain(Number(Rangex0),Number(Rangex1), Number(Epsilon), FnState);
        setAns(result.ans); // Set the result using setAns
        setdataX(result.dataXset);
        setdataY(result.dataYset);
  }
  
  return (
    <div className="Main">
      <h1>Secant</h1>
      <form onSubmit={eventHandler}>
        <label>f(x)</label>
        <input
          type="text"
          placeholder="Enter the function"
          value={FnState}
          onChange={(e) => setFn(e.target.value)}
        />
        <p></p>
        <label>Start</label>
        <input
          type="text"
          value={Rangex0}
          placeholder="Enter X0"
          onChange={(e) => setRangex0(e.target.value)}
        />
        <input
          type="text"
          value={Rangex1}
          placeholder="Enter X1"
          onChange={(e) => setRangex1(e.target.value)}
        />
        <p></p>
        <label>Epsilon</label>
        <input
          type="text"
          value={Epsilon}
          onChange={(e) => setEpsilon(e.target.value)}
        />
        <p></p>
        <button type="submit">Submit</button>
        <p>{Ans}</p>
      </form>
      <div>
      <Plot 
        data={[
          {
            x: dataX,
            y: dataY,
            mode: "lines+markers",
            marker: {color: "red"},
            line: {color: "blue"},
            transforms: [
              {
                type: "sort",
              }
            ]
          },
        ]}
        config={{
            scrollZoom:true
        }}
        layout={ {width: 1280, height: 450, title: 'Secant'} }
          
      />
      </div>
    </div>
  );

}
export default Secant;