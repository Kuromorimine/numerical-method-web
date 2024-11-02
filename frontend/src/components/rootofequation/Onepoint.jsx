import { compile } from "mathjs";
import { useState } from "react";
import Plot from 'react-plotly.js'
import Table from "react-bootstrap/Table";

function OnepointMain(Rangexl,Epsilon, Fn){
    const fn=compile(Fn);
    
    let xl=Rangexl,xnew,xold,iter=0,ans;
    
    var dataXset=[],dataYset=[],dataErrset=[];
    xold=xl;
    xnew=fn.evaluate({x:xold});
    dataXset.push(xold);
    dataYset.push(xnew);
    dataErrset.push(Math.abs((xnew-xold)/xnew)*100);
    while(Math.abs((xnew-xold)/xnew)*100 > Epsilon){
        dataErrset.push(Math.abs((xnew-xold)/xnew)*100);
        xold=xnew;
        xnew=fn.evaluate({x:xold});
        dataXset.push(xold);
        dataYset.push(xnew);
        iter++;
    }
    ans=xnew;
    console.log(xnew);
    return {ans,dataXset,dataYset,iter,dataErrset};

}
// function(dataXset){
// return dataXset;
// }
// function(dataYset){
// re
// }
function Onepoint(){
    const [Ans, setAns] = useState(null);
    const [FnState, setFn] = useState("");
    const [Rangexl, setRangexl] = useState("");
    const [Epsilon, setEpsilon] = useState("");
    const [dataX,setdataX]=useState(null);
    const [dataY,setdataY]=useState(null);
    const [dataErr,setdataErr]=useState(null);
    const [iteration,setiteration]=useState(null);

    function eventHandler(e) {
        e.preventDefault();
        console.log(Rangexl);
        
        
        const result = OnepointMain(Number(Rangexl), Number(Epsilon), FnState);
        setAns(result.ans); // Set the result using setAns
        setdataX(result.dataXset);
        setdataY(result.dataYset);
        setiteration(result.iter);
        setdataErr(result.dataErrset);
  }
  
  return (
    <div className="Main">
      <h1>Onepoint</h1>
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
          value={Rangexl}
          onChange={(e) => setRangexl(e.target.value)}
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
        <p>Ans is {Ans} and iteration is {iteration}</p>
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
        layout={ {width: 1280, height: 450, title: 'Onepoint'} }
          
      />
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>iter</th>
            <th>x</th>
            <th>f(x)</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {dataX && dataX.map((x, idx) =>//x is value and idx is index running
            <tr key={`${x}-${idx}`}>
              <td>{idx}</td>
              <td>{x}</td>
              <td>{dataY[idx]}</td>
              <td>{dataErr[idx]}%</td>
            </tr>)}
          
        </tbody>
      </Table>
    </div>
  );

}
export default Onepoint;