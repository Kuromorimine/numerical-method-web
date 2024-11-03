import React from 'react'

export default function History({allEquations}) {
  return (
    <div className="w-25 overflow-scroll">
          <h1>history</h1>
{/* 
          {
    "id": 
    "sizearray":
    "inputx": "1",
    "m": null,
    "regressionarrayx": [
    ],
    "regressionarrayy": [
    ],
    "method": "linear"
} */}
          {allEquations.map((element, index) => 
          <div className="card p-4" key={element.id}>
            <p>#id: {element.id}</p>
            <p>sizeArray: {element.sizearray}</p>
            <p>regressionarrayX:{element.regressionarrayx}</p>
            <p>regressionarrayY:{element.regressionarrayy}</p>
            <p>M:{element.m}</p>
            <p>inputX: {element.inputx}</p>
            {/* <button type="button" class="btn btn-primary">
              Choose
            </button> */}
          </div>
          )
          }
          
        </div>
  )
}
