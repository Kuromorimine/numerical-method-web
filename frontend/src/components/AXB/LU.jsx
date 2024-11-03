import React from "react";
import { Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";

const backEndUrl = "http://localhost:3000";
function LU() {
    const [matrix, setMatrix] = useState([[-2,3,1],[3,4,-5], [1,-2,1]]);
    const [b, setB] = useState([9,0,-4])
    const [size, setSize] = useState(3);
    const [result, setResult] = useState([0, 0, 0]);

    const inputSize = (event)=> {
        if (event.target.value >= 2) {
            setSize(event.target.value);
        }
    }
    const inputMatrixSize = ()=> {
        const newMatrix = [];
        for (let i = 0; i < size; i++) {
            const rowMatrix = [];
            for (let j = 0; j < size; j++) {
                rowMatrix.push(0);
            }
            newMatrix.push(rowMatrix);
        }
        setMatrix(newMatrix);

        const newB = [];
        for (let i = 0; i < size;i++) {
            newB.push(0);
        }
        setB(newB);
    }
    const changeMatrix = (event, row, col)=> {
        const newMatrix = [...matrix];
        newMatrix[row][col] = event.target.value;
        setMatrix(newMatrix);
    }
    const inputB = (event, index)=> {
        const newB = [...b];
        newB[index] = event.target.value;
        setB(newB);
    }

    const calculator = async()=> {
        let mtx = JSON.parse(JSON.stringify(matrix));
        let output = JSON.parse(JSON.stringify(b));
        let LUResult = [];
        LUResult = LU(mtx,output);
        setResult(LUResult);
        const payload = {
            size:size,
            matrixA:matrix,
            matrixB:b,
            method: "lu",
          };
      
          //2 create function fetch
          await fetch(`${backEndUrl}/matrix`, {
            method: "POST",
            body: JSON.stringify(payload),
          });
    }

    const LU = (m,matrixB)=> {
        let resultY = [];
        let resultX = [];
        let Lmx = [];
        for (let i=0;i< m.length;i++){
            let tempmtx = [];
            resultX.push(0);
            resultY.push(0);
            for (let k=0;k<m[0].length;k++){
                tempmtx.push(0);
            }
            Lmx.push(tempmtx);
        }

        let base;
        for (let p = 0;p<m.length;p++) {
            for (let i = p; i < m.length; i++) {
                base = m[i][p] / m[p][p];
                if (i === p) {
                    Lmx[i][p] = 1;
                } else {
                    Lmx[i][p] = base;
                    for (let j = p; j < m[0].length; j++) {
                        m[i][j] -= base * m[p][j];
                    }
                }
            }
        }

        resultY[0] = matrixB[0] / Lmx[0][0];
        for (let i = 1;i<m.length;i++){
            resultY[i] += matrixB[i];
            for (let j=0;j<i;j++) {
                resultY[i] -= (Lmx[i][j] * resultY[j]);
            }
            resultY[i] /= Lmx[i][i];
        }
        resultX[2] = resultY[2] / m[2][2];
        for (let i = m.length-2;i>-1;i--){
            resultX[i] += resultY[i];
            for (let j=m[0].length-1;j>i;j--) {
                resultX[i] -= (m[i][j] * resultX[j]);
            }
            resultX[i] /= m[i][i];
        }
        return resultX;
    }

    return(
        <Card>
            <h1>LU Decomposition</h1>
            <Card.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Col xs={3}>
                            <Form.Label>Matrix size</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" value={size} onChange={(e)=> {inputSize(e)}}></Form.Control>
                                <Button variant="secondary" onClick={inputMatrixSize}>Set</Button>
                            </InputGroup>
                            
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col>
                            <Form.Label>A</Form.Label>
                            {matrix.map((row, rowIndex)=> (
                                <InputGroup key={rowIndex}>
                                    {matrix[rowIndex].map((col, colIndex)=> (
                                        <Form.Control key={colIndex} value={matrix[rowIndex][colIndex]} onChange={(e)=> changeMatrix(e, rowIndex, colIndex)}></Form.Control>
                                    ))}
                                </InputGroup>
                            ))}
                        </Col>
                        <Col xs={1}>
                            <Form.Label>x</Form.Label>
                            {matrix.map((row, rowIndex)=> (
                                <Form.Group key={rowIndex}>
                                    <Form.Control className="text-center" value={`x${rowIndex}`} disabled></Form.Control>
                                </Form.Group>
                            ))}
                        </Col>
                        <Col xs={1}>
                            <Form.Label>b</Form.Label>
                            {b.map((row, index)=> (
                                <Form.Group key={index}>
                                    <Form.Control className="text-center" value={b[index]} onChange={(e)=> inputB(e, index)}></Form.Control>
                                </Form.Group>
                            ))}
                        </Col>
                        
                    </Form.Group>
                    <Button variant="primary" onClick={calculator}>Calculate</Button>
                </Form>
            </Card.Body>
            {result.map((x, index)=> (
                <Card.Footer key={index}>x{index}: {x}</Card.Footer>
            ))}
        </Card>
    )
}

export default LU;