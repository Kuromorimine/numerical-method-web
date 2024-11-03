import React from 'react'

export default function History({allEquations}) {
  return (
    <div className="w-25 overflow-scroll">
          <h1>history</h1>

          {allEquations.map((element, index) => 
          <div className="card p-4" key={element.id}>
            <p>#id: {element.id}</p>
            <p>function: {element.function}</p>
            <p>start: {element.start}</p>
            {
              element.stop && <p>stop: {element.stop}</p>
            }
            {/* <button type="button" class="btn btn-primary">
              Choose
            </button> */}
          </div>
          )
          }
          
        </div>
  )
}
