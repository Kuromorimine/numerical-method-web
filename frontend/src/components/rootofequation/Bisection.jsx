import { compile } from "mathjs";
import { useState } from "react";
import Plot from 'react-plotly.js'
import Table  from "react-bootstrap/Table";
function BisectionMain(Rangexl, Rangexr, Epsilon, Fn){
    function xm(xl,xr){
        return (xl+xr)/2;
    }
    const fn=compile(Fn);
    let xl=Rangexl,xr=Rangexr,ans,xmt,xmnew,xmold,iter=0;
    var dataXset=[],dataYset=[],dataErrset=[];
    
    do{
        xmold=xm(xl,xr);
        
        
        //fn(xm(xl,xr))
        xmt=fn.evaluate({x:xm(xl,xr)});
        if(xmt!=0){
            if(xmt*fn.evaluate({x:xl})>0){
                xl=xm(xl,xr);
            }
            else if(xmt*fn.evaluate({x:xr})>0){
                xr=xm(xl,xr);
            }
        }
        xmnew=xm(xl,xr);
        dataXset.push(xmnew);
        dataYset.push(fn.evaluate({x:xmnew}));
        // cout << xmnew;
        ans=xmnew;
        dataErrset.push(Math.abs((xmnew-xmold)/xmnew)*100);
        iter++;
    }while(Math.abs((xmnew-xmold)/xmnew) >= Epsilon);
    return {ans,dataXset,dataYset,iter,dataErrset};
    //cout << xmnew;
}
function Bisection(){
    const [Ans, setAns] = useState(null);
    const [FnState, setFn] = useState("");
    const [Rangexl, setRangexl] = useState("");
    const [Rangexr, setRangexr] = useState("");
    const [Epsilon, setEpsilon] = useState("");
    const [dataX,setdataX]=useState(null);
    const [dataY,setdataY]=useState(null);
    const [dataErr,setdataErr]=useState(null);
    const [Iteration,setiteration]=useState(null);

    function eventHandler(e) {
        e.preventDefault();
        console.log(Rangexl);
        console.log(Rangexr);
        const result = BisectionMain(Number(Rangexl), Number(Rangexr), Number(Epsilon), FnState);
    
        setAns(result.ans); // Set the result using setAns
        setdataX(result.dataXset);
        setdataY(result.dataYset);
        setiteration(result.iter);
        setdataErr(result.dataErrset);
  }

  return (
    <div className="Main">
      <h1>Bisection</h1>
      <form onSubmit={eventHandler}>
        <label>f(x)</label>
        <input
          type="text"
          placeholder="Enter the function"
          value={FnState}
          onChange={(e) => setFn(e.target.value)}
        />
        <p></p>
        <label>Range</label>
        <input
          type="text"
          value={Rangexl}
          onChange={(e) => setRangexl(e.target.value)}
        />
        <label>,</label>
        <input
          type="text"
          value={Rangexr}
          onChange={(e) => setRangexr(e.target.value)}
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
        <p>Ans is {Ans} and iteration is {Iteration}</p>
      </form>
      <div>
      <Plot 
        data={[
          {
            x: Iteration,
            y: dataErr,
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
        layout={ {width: 1280, height: 450, title: 'Bisection'} }
          
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
export default Bisection;