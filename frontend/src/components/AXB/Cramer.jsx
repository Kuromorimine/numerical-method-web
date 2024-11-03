// import React from "react";
// import { Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
// import { useState } from "react";

// function Cramer() {
//     const [matrix, setMatrix] = useState([[-2,3,1],[3,4,-5], [1,-2,1]]);
//     const [b, setB] = useState([9,0,-4])
//     const [size, setSize] = useState(3);
//     const [result, setResult] = useState([0, 0, 0]);

//     const inputSize = (event)=> {
//         if (event.target.value >= 2) {
//             setSize(event.target.value);
//         }
//     }
//     const inputMatrixSize = ()=> {
//         const newMatrix = [];
//         for (let i = 0; i < size; i++) {
//             const rowMatrix = [];
//             for (let j = 0; j < size; j++) {
//                 rowMatrix.push(0);
//             }
//             newMatrix.push(rowMatrix);
//         }
//         setMatrix(newMatrix);

//         const newB = [];
//         for (let i = 0; i < size;i++) {
//             newB.push(0);
//         }
//         setB(newB);
//     }
//     const changeMatrix = (event, row, col)=> {
//         const newMatrix = [...matrix];
//         newMatrix[row][col] = event.target.value;
//         setMatrix(newMatrix);
//     }
//     const inputB = (event, index)=> {
//         const newB = [...b];
//         newB[index] = event.target.value;
//         setB(newB);
//     }

//     const calculator = ()=> {
//         let mtx = JSON.parse(JSON.stringify(matrix));
//         let output = [...b];
//         let cramerResult = [];
//         for (let col = 0; col < size; col++) {
//             // re clone matrix
//             let tempm = JSON.parse(JSON.stringify(matrix));

//             // replace a[i] with b
//             for (let row = 0; row < size; row++) {
//                 tempm[row][col] = output[row];
//             }
//             let det = determinant(mtx);
//             let detI = determinant(tempm);
//             cramerResult.push(detI/det);
//         }
//         setResult(cramerResult);
//     }

//     const determinant = (matrix)=> {
//         let det=0;
//         for (let i=0;i<size;i++){
//             let down=1;
//             let up=1;
//             for (let j=0;j<size;j++){
//                 down*=matrix[j][(i + j) % size];

//                 up*=matrix[size-1-j][(i+j) % size];
//             }
//             det+=down-up;
//         }
//         return det;
//     }

//     return(
//         <Card>
//             <h1>Cramer Rule</h1>
//             <Card.Body>
//                 <Form>
//                     <Form.Group as={Row} className="mb-3">
//                         <Col xs={3}>
//                             <Form.Label>Matrix size</Form.Label>
//                             <InputGroup>
//                                 <Form.Control type="number" value={size} onChange={(e)=> {inputSize(e)}}></Form.Control>
//                                 <Button variant="secondary" onClick={inputMatrixSize}>Set</Button>
//                             </InputGroup>
                            
//                         </Col>
//                     </Form.Group>
//                     <Form.Group as={Row} className="mb-3">
//                         <Col>
//                             <Form.Label>A</Form.Label>
//                             {matrix.map((row, rowIndex)=> (
//                                 <InputGroup key={rowIndex}>
//                                     {matrix[rowIndex].map((col, colIndex)=> (
//                                         <Form.Control key={colIndex} value={matrix[rowIndex][colIndex]} onChange={(e)=> changeMatrix(e, rowIndex, colIndex)}></Form.Control>
//                                     ))}
//                                 </InputGroup>
//                             ))}
//                         </Col>
//                         <Col xs={1}>
//                             <Form.Label>x</Form.Label>
//                             {matrix.map((row, rowIndex)=> (
//                                 <Form.Group key={rowIndex}>
//                                     <Form.Control className="text-center" value={`x${rowIndex}`} disabled></Form.Control>
//                                 </Form.Group>
//                             ))}
//                         </Col>
//                         <Col xs={1}>
//                             <Form.Label>b</Form.Label>
//                             {b.map((row, index)=> (
//                                 <Form.Group key={index}>
//                                     <Form.Control className="text-center" value={b[index]} onChange={(e)=> inputB(e, index)}></Form.Control>
//                                 </Form.Group>
//                             ))}
//                         </Col>
                        
//                     </Form.Group>
//                     <Button variant="primary" onClick={calculator}>Calculate</Button>
//                 </Form>
//             </Card.Body>
//             {result.map((x, index)=> (
//                 <Card.Footer key={index}>x{index}: {x}</Card.Footer>
//             ))}
//         </Card>
//     )
// }

// export default Cramer;