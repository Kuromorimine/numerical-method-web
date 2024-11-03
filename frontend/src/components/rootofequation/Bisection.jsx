import { compile } from "mathjs";
import { useEffect,useState } from "react";
import History from "./history";
import Plot from "react-plotly.js";
import Table from "react-bootstrap/Table";

const backEndUrl = "http://localhost:3000";
function BisectionMain(Rangexl, Rangexr, Epsilon, Fn) {
  function xm(xl, xr) {
    return (xl + xr) / 2;
  }
  const fn = compile(Fn);
  let xl = Rangexl,
    xr = Rangexr,
    ans,
    xmt,
    xmnew,
    xmold,
    iter = 0;
  var dataXset = [],
    dataYset = [],
    dataErrset = [];

  do {
    xmold = xm(xl, xr);

    //fn(xm(xl,xr))
    xmt = fn.evaluate({ x: xm(xl, xr) });
    if (xmt != 0) {
      if (xmt * fn.evaluate({ x: xl }) > 0) {
        xl = xm(xl, xr);
      } else if (xmt * fn.evaluate({ x: xr }) > 0) {
        xr = xm(xl, xr);
      }
    }
    xmnew = xm(xl, xr);
    dataXset.push(xmnew);
    dataYset.push(fn.evaluate({ x: xmnew }));
    // cout << xmnew;
    ans = xmnew;
    dataErrset.push(Math.abs((xmnew - xmold) / xmnew) * 100);
    iter++;
  } while (Math.abs((xmnew - xmold) / xmnew) >= Epsilon);
  return { ans, dataXset, dataYset, iter, dataErrset };
  //cout << xmnew;
}
function Bisection() {
  const [Ans, setAns] = useState(null);
  const [FnState, setFn] = useState("4x^2-5");
  const [Rangexl, setRangexl] = useState("0");
  const [Rangexr, setRangexr] = useState("100");
  const [Epsilon, setEpsilon] = useState("0.00001");
  const [dataX, setdataX] = useState(null);
  const [dataY, setdataY] = useState(null);
  const [dataErr, setdataErr] = useState(null);
  const [Iteration, setiteration] = useState(null);
  const [allEquations, setAllEquations] = useState([]);

  async function eventHandler(e) {
    e.preventDefault();
    console.log(Rangexl);
    console.log(Rangexr);
    const result = BisectionMain(
      Number(Rangexl),
      Number(Rangexr),
      Number(Epsilon),
      FnState
    );

    setAns(result.ans); // Set the result using setAns
    setdataX(result.dataXset);
    setdataY(result.dataYset);
    setiteration(result.iter);
    setdataErr(result.dataErrset);

    //create payload
    const payload = {
      function: FnState,
      start: Rangexl,
      stop: Rangexr,
      method: "bisection",
    };

    //2 create function fetch
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
      console.log(data.data.filter((element) => element.method == 'bisection'))
      setAllEquations(data.data.filter((element) => element.method == 'bisection'));
    };

    getAllData();
  }, []);
  return (
    <div className="Main">
      <div className="d-flex justify-content-between" style={{height: 300+"px"}}>
        <div>
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
            <p>
              Ans is {Ans} and iteration is {Iteration}
            </p>
          </form>
        </div>

        <History allEquations={allEquations}/>
      </div>


      <div>
        <Plot
          data={[
            {
              x: Iteration,
              y: dataErr,
              mode: "lines+markers",
              marker: { color: "red" },
              line: { color: "blue" },
              transforms: [
                {
                  type: "sort",
                },
              ],
            },
          ]}
          config={{
            scrollZoom: true,
          }}
          layout={{ width: 1280, height: 450, title: "Bisection" }}
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
          {dataX &&
            dataX.map(
              (
                x,
                idx //x is value and idx is index running
              ) => (
                <tr key={`${x}-${idx}`}>
                  <td>{idx}</td>
                  <td>{x}</td>
                  <td>{dataY[idx]}</td>
                  <td>{dataErr[idx]}%</td>
                </tr>
              )
            )}
        </tbody>
      </Table>
    </div>
  );
}
export default Bisection;
