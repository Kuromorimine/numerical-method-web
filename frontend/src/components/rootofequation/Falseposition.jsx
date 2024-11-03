import { compile } from "mathjs";
import { useEffect,useState } from "react";
import Plot from 'react-plotly.js'
import Table from "react-bootstrap/Table";
import History from "./history";

const backEndUrl = "http://localhost:3000";
function FalsepositionMain(Rangexl, Rangexr, Epsilon, Fn){
    function xm(xl,xr){
        return ((xl*fn.evaluate({x:xr}))-(xr*fn.evaluate({x:xl})))/(fn.evaluate({x:xr})-fn.evaluate({x:xl}));
    }
    const fn=compile(Fn);
    let xl=Rangexl,xr=Rangexr,ans,xmt,xmnew,xmold=0,iter=0;
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
function Falseposition(){
    const [Ans, setAns] = useState(null);
    const [FnState, setFn] = useState("");
    const [Rangexl, setRangexl] = useState("");
    const [Rangexr, setRangexr] = useState("");
    const [Epsilon, setEpsilon] = useState("");
    const [dataX,setdataX]=useState(null);
    const [dataY,setdataY]=useState(null);
    const [dataErr,setdataErr]=useState(null);
    const [iteration,setiteration]=useState(null);
    const [allEquations, setAllEquations] = useState([]);

    async function eventHandler(e) {
        e.preventDefault();
        console.log(Rangexl);
        console.log(Rangexr);
        const result = FalsepositionMain(Number(Rangexl), Number(Rangexr), Number(Epsilon), FnState);
    
        setAns(result.ans); // Set the result using setAns
        setdataX(result.dataXset);
        setdataY(result.dataYset);
        setiteration(result.iter);
        setdataErr(result.dataErrset);

        const payload = {
          function: FnState,
          start: Rangexl,
          stop: Rangexr,
          method: "falseposition",
        };

        await fetch(`${backEndUrl}/root-of-equation`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
  }
  useEffect(() => {
    const getAllData = async () => {
      const response = await fetch(`${backEndUrl}/root-of-equation`, {
        method: "GET",
      });

      const data = await response.json();
      
      setAllEquations(data.data.filter((element) => element.method == 'falseposition'));
    };

    getAllData();
  }, []);
  return (
    <div className="Main">
      <div className="d-flex justify-content-between" style={{height: 300+"px"}}>
        <div>
          <h1>FalsePosition</h1>
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
            <p>Ans is {Ans} and iteration is {iteration}</p>
          </form>
        </div>
        <History allEquations={allEquations}/>
      </div>
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
        layout={ {width: 1280, height: 450, title: 'FalsePosition'} }
          
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
export default Falseposition;