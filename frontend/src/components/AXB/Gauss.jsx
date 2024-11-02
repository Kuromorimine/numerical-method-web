import React from "react";
import { Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";

function Gaussian() {
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

    const calculator = ()=> {
        let mtx = JSON.parse(JSON.stringify(matrix));
        let output = [...b];
        let GaussianResult = [];
        GaussianResult = gaussian(mtx,output);
        setResult(GaussianResult);
    }

    const gaussian = (m,matrixB)=> {
        let temp,fixed;
        let output = [];
        for (let j = 0; j < m.length; j++) {
            output.push(0);
        }

        let row = m.length,col = m[0].length;
        for (let i=0;i< m.length;i++){
            fixed = m[i][i];
            matrixB[i] /= fixed;
            for (let k=0;k<m[0].length;k++){
                m[i][k] /= fixed;
            }
            for (let j=0;j< m.length;j++){
                if (i<j){
                    temp=m[j][i];
                    matrixB[j]-= matrixB[i]*temp;
                    for (let r=0;r<m[0].length;r++){
                        m[j][r] -= m[i][r]*temp ;
                    }
                }
            }
        }

        console.log(m);
        output[row - 1] = matrixB[row-1] / m[row - 1][col - 1];
        for (let i = row - 2; i > -1; i--) {
            output[i] = matrixB[i];
            for (let j = i + 1; j < col; j++) {
                output[i] = output[i] - m[i][j] * output[j];
            }
            output[i] = output[i] / m[i][i];
        }
        return output;
    }

    return(
        <Card>
            <h1>Gaussian</h1>
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

export default Gaussian;