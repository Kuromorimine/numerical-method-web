import { compile } from "mathjs";
import { useState } from "react";
import Plot from 'react-plotly.js'
import Table from "react-bootstrap/Table";

function NewtonraphsonMain(Rangexl,Epsilon, FnState1,FnState2){
    const fn1=compile(FnState1);
    const fn2=compile(FnState2);
    
    let xl=Rangexl,xnew,xold,iter=0,ans;
    
    var dataXset=[],dataYset=[],dataErrset=[];
    xold=xl;
    xnew=xold-(fn1.evaluate({x:xold})/fn2.evaluate({x:xold}))
    dataXset.push(xold);
    dataYset.push(xnew);
    dataErrset.push(Math.abs((xnew-xold)/xnew)*100);
    while(Math.abs((xnew-xold)/xnew)*100 > Epsilon){
        xold=xnew;
        xnew=xold-(fn1.evaluate({x:xold})/fn2.evaluate({x:xold}))
        dataXset.push(xold);
        dataYset.push(xnew);
        dataErrset.push(Math.abs((xnew-xold)/xnew)*100);
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
function Newtonraphson(){
    const [Ans, setAns] = useState(null);
    const [FnState1, setFn1] = useState("");
    const [FnState2, setFn2] = useState("");
    const [Rangexl, setRangexl] = useState("");
    const [Epsilon, setEpsilon] = useState("");
    const [dataX,setdataX]=useState(null);
    const [dataY,setdataY]=useState(null);
    const [dataErr,setdataErr]=useState(null);
    const [iteration,setiteration]=useState(null);

    function eventHandler(e) {
        e.preventDefault();
        console.log(Rangexl);
        
        
        const result = NewtonraphsonMain(Number(Rangexl), Number(Epsilon), FnState1,FnState2);
        setAns(result.ans); // Set the result using setAns
        setdataX(result.dataXset);
        setdataY(result.dataYset);
        setiteration(result.iter);
        setdataErr(result.dataErrset);
  }
  
  return (
    <div className="Main">
      <h1>NewtonRapAke</h1>
      <form onSubmit={eventHandler}>
        <label>f(x)</label>
        <input
          type="text"
          placeholder="Enter the function 1"
          value={FnState1}
          onChange={(e) => setFn1(e.target.value)}
        />
        <p></p>
        <label>f'(x)</label>
        <input
          type="text"
          placeholder="Enter diff the function 1"
          value={FnState2}
          onChange={(e) => setFn2(e.target.value)}
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
            // transforms: [
            //   {
            //     type: "sort",
            //   }
            // ]
          },
        ]}
        config={{
          scrollZoom:true
        }}
        layout={ {width: 1280, height: 450, title: 'Newton-Raphson'} }
          
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
          {dataX && dataX.map((x, idx) =>
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
export default Newtonraphson;