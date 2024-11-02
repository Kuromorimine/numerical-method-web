import React from "react";
import { Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";

function MatrixInversion() {
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
        let output = JSON.parse(JSON.stringify(b));
        let MatrixInversionResult = [];
        MatrixInversionResult = MatrixInversion(mtx,output);
        setResult(MatrixInversionResult);
    }

    const MatrixInversion = (m,matrixB)=> {
        let temp,fixed;
        let Imatrix = [];
        for (let i=0;i< m.length;i++){
            let tempmtx = [];
            for (let k=0;k<m[0].length;k++){
                (i===k) ? tempmtx.push(1): tempmtx.push(0);
            }
            Imatrix.push(tempmtx);
        }

        for (let i=0;i< m.length;i++){
            fixed = m[i][i];
            for (let k=0;k<m[0].length;k++){
                m[i][k] /= fixed;
                Imatrix[i][k] /= fixed
            }
            for (let j=0;j< m.length;j++){
                if (i!=j){
                    temp=m[j][i];
                    for (let r=0;r<m[0].length;r++){
                        m[j][r] -= m[i][r]*temp ;
                        Imatrix[j][r] -= Imatrix[i][r] * temp;
                    }
                }
            }
        }

        console.log(Imatrix);

        let output = [];
        for (let i=0;i<Imatrix.length;i++){
            output.push(0);
        }

        for (let i=0;i<Imatrix.length;i++){
            let sum=0;
            for (let j = 0;j<Imatrix[0].length;j++){
                sum += Imatrix[i][j] * matrixB[j];

            }
            output[i] = sum;
        }
        return output;
    }

    return(
        <Card>
            <h1>Matrix Inversion</h1>
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

export default MatrixInversion;