import { abs, compile, evaluate, floor, log, pow } from "mathjs";
import { useState } from "react";

import Plot from 'react-plotly.js'
import Table from "react-bootstrap/Table";
import 'bootstrap/dist/css/bootstrap.min.css';
function GraphicalMain(Rangexl, Rangexr, Epsilon, Fn) {
  const fn = compile(Fn);

  let xl = Rangexl, xr = Rangexr, ans;
  var dataXset = [], dataYset = [];
  for (let i = xl; i <= xr; i++) {

    if (i < 10) {
      dataXset.push(xl);
      dataYset.push(fn.evaluate({ x: xl }));
    }

    if (fn.evaluate({ x: xl })) {

      xl = i;
      xr = i + 1;
      break;
    }
  }
  let iter = 0;
  while (fn.evaluate({ x: xl }) < Epsilon) {
    if (iter < 100) {
      dataXset.push(xl);
      dataYset.push(fn.evaluate({ x: xl }));

    }
    iter++;
    xl = xl + Epsilon;
  }
  console.log(xl);
  ans = xl;
  return { ans, dataXset, dataYset, iter };

}

export function graphicalMethod(
  xStart,
  xEnd,
  errorFactor,
  func
) {
  const result = { result: 0, iter: 0, iterations: [] };

  if (xStart >= xEnd) {
    result.error = 'xStart must be less than xEnd';
    return result;
  }

  const calculateStep = (xStart, xEnd) => {
    const step = log(xEnd - xStart, 10);
    if (step % 1 == 0) return Number(pow(10, step - 1));
    return Number(pow(10, floor(step)));
  };

  let step = calculateStep(xStart, xEnd);
  const MAX_ITER = 1000;
  let iter = 0;
  let x = xStart;
  let temp = evaluate(func, { x: xStart });
  let newTemp;
  while (iter < MAX_ITER) {
    iter += 1;
    if (iter == MAX_ITER) {
      result.error = 'Max iteration reached';
      break;
    }

    // x here
    newTemp = evaluate(func, { x });

    if (result.iterations) result.iterations.push({ x: Number(x), y: newTemp });

    if (abs(newTemp) < errorFactor) {
      break;
    }
    // sign changed
    if (temp * newTemp < 0) {
      x -= step;
      step /= 10;

      newTemp = evaluate(func, { x });
    }

    if (x == xEnd) break;

    x += step;
    if (x > xEnd) {
      x = xEnd;
    }

    temp = newTemp;
  }

  result.result = x;
  result.iter = iter;
  
  const dataXSet = [];
  const dataYSet = [];
  for(let i=0; i< result.iterations.length;i++) {
    dataXSet.push(result.iterations[i].x);
    dataYSet.push(result.iterations[i].y);
  }

  return { ans:x, dataXset: dataXSet, dataYset: dataYSet, iter };
}
// function(dataXset){
// return dataXset;
// }
// function(dataYset){
// re
// }
function Graphical() {
  const [Ans, setAns] = useState(null);
  const [FnState, setFn] = useState("");
  const [Rangexl, setRangexl] = useState("");
  const [Rangexr, setRangexr] = useState("");
  const [Epsilon, setEpsilon] = useState("");
  const [dataX, setdataX] = useState(null);
  const [dataY, setdataY] = useState(null);
  const [iteration, setiteration] = useState(null);
  function eventHandler(e) {
    e.preventDefault();
    console.log(Rangexl);
    console.log(Rangexr);

    const result = graphicalMethod(Number(Rangexl), Number(Rangexr), Number(Epsilon), FnState);
    setAns(result.ans); // Set the result using setAns
    setdataX(result.dataXset);
    setdataY(result.dataYset);
    setiteration(result.iter);
  }

  return (
    <div className="Main">
      <h1>Graphical</h1>
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
        <p>Ans is {Ans} and Iteration is {iteration}</p>
      </form>
      <div>
        <Plot
          data={[
            {
              x: dataX,
              y: dataY,
              mode: "lines+markers",
              marker: { color: "red" },
              line: { color: "blue" },
              transforms: [
                {
                  type: "sort",
                }
              ]
            },
          ]}
          config={{
            scrollZoom: true
          }}
          layout={{ width: 1280, height: 450, title: 'Grahpical' }}

        />
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>iter</th>
            <th>x</th>
            <th>f(x)</th>

          </tr>
        </thead>
        <tbody>
          {dataX && dataX.map((x, idx) =>
            <tr key={`${x}-${idx}`}>
              <td>{idx}</td>
              <td>{x}</td>
              <td>{dataY[idx]}</td>
            </tr>)}
          
        </tbody>
      </Table>
    </div>
  );

}
export default Graphical;