import { compile } from "mathjs";
import { useEffect,useState } from "react";
import History from "./history";
import Plot from 'react-plotly.js'

const backEndUrl = "http://localhost:3000";
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
    const [allEquations, setAllEquations] = useState([]);


    async function eventHandler(e) {
        e.preventDefault();
        console.log(Rangex0);
        console.log(Rangex1);
        
        const result = SecantMain(Number(Rangex0),Number(Rangex1), Number(Epsilon), FnState);
        setAns(result.ans); // Set the result using setAns
        setdataX(result.dataXset);
        setdataY(result.dataYset);

        const payload = {
          function: FnState,
          start: Rangex0,
          stop:Rangex1,
          method: "Secant",
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
      
      setAllEquations(data.data.filter((element) => element.method == 'Secant'));
    };

    getAllData();
  }, []);
  return (
    <div className="Main">
      <div className="d-flex justify-content-between" style={{height: 300+"px"}}>
        <div>
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
        layout={ {width: 1280, height: 450, title: 'Secant'} }
          
      />
      </div>
    </div>
  );

}
export default Secant;