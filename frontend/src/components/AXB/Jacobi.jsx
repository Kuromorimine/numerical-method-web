import React from "react";
import { Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";

function Jacobi() {
    const [matrix, setMatrix] = useState([[5,2,0,0],[2,5,2,0], [0,2,5,2], [0,0,2,5]]);
    const [b, setB] = useState([12,17,14,7])
    const [size, setSize] = useState(4);
    const [result, setResult] = useState([0, 0, 0,0]);

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

    const checkError = (xold,xnew,E) =>{
        let test;
        for (let i =0;i< parseInt(size);i++){
            test = (Math.abs((parseFloat(xnew[i])-parseFloat(xold[i]))/parseFloat(xnew[i])) * 100);
            if (test > parseFloat(E)){
                return true;
            }
        }
        return false;
    }
    const setNum = (xold,xnew,output,mtx)=>{
        for (let j =0;j< parseInt(size);j++) {
            xnew[j] = parseFloat(output[j]);
            for (let i = 1; i < parseInt(size); i++) {
                xnew[j] = parseFloat(xnew[j]) - (parseFloat(mtx[j][(j + i) % parseInt(size)]) * parseFloat(xold[(j + i) % parseInt(size)]));
            }
            xnew[j] = parseFloat(xnew[j]) / parseFloat(mtx[j][j]);
        }
    }
    const calculator = ()=> {
        let mtx = JSON.parse(JSON.stringify(matrix));
        let output = JSON.parse(JSON.stringify(b));
        let X = [];
        let Xold = [];
        let eps=0.000001;
        let iter=1;
        for (let i = 0; i < parseInt(size); i++) {
            X.push(0);
            Xold.push(0);
        }

        do {
            Xold = [...X];
            setNum(Xold,X,output,mtx);
        } while (checkError(Xold,X,eps));
        setResult(X);
    }


    return(
        <Card>
            <h1>Jacobi iteration</h1>
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

export default Jacobi;