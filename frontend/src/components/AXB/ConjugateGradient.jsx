import React from "react";
import { Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";

const backEndUrl = "http://localhost:3000";
function ConjugateGradient() {
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


    const Xcal = (X,LMD,D)=>{
        let Xnew = [],Dtemp = [];
        for (let i = 0; i < size; i++) {
            Xnew.push(0);
            Dtemp.push(0);
        }
        for (let j=0;j<size;j++){
            Dtemp[j] = D[j] * LMD;
        }
        for (let j=0;j<size;j++){
            Xnew[j] = X[j] + Dtemp[j];
        }
        return Xnew;
    }

    const Lamdacal=( D, R,A)=>{
        let Lamda,temp2=0;
        let TempDA = [];
        for (let i = 0; i < size; i++) {
            TempDA.push(0);
        }
        for (let j=0;j<size;j++){
            for (let k=0;k<size;k++){
                TempDA[j] += D[k] * A[k][j];
            }
        }
        for (let k=0;k<size;k++){
            temp2 += TempDA[0][k] * D[k];
        }
        Lamda =  (sum(D,R)) / (temp2);
        return -Lamda;
    }

    const alphacal = ( R,A, D)=>{
        let alpha,tempD=0,tempR=0;
        let TempDA =[],TempRA =[];
        for (let i = 0; i < size; i++) {
            TempDA.push(0);
            TempRA.push(0);
        }
        for (let j=0;j<size;j++){
            for (let k=0;k<size;k++){
                TempRA[j] += R[k] * A[k][j];
            }
        }
        for (let k=0;k<size;k++){
            tempR += TempRA[k] * D[k];
        }

        for (let j=0;j<size;j++){
            for (let k=0;k<size;k++){
                TempDA[j] += D[k] * A[k][j];
            }
        }
        for (let k=0;k<size;k++){
            tempD += TempDA[k] * D[k];
        }
        alpha = (tempR) / (tempD);
        return alpha;
    }

    const sum=( A, B)=>{
        let C = 0;
        for (let i=0;i<size;i++){
            C += A[i] * B[i];
        }
        return C;
    }
    const calMultiR=( A, B)=>{
        let C = [];
        for (let i = 0; i < size; i++) {
            C.push(0);
        }
        for (let i=0;i<size;i++){
            for (let j=0;j<size;j++){
                C[i] += A[i][j] * B[j];
            }
        }
        return C;
    }
    const Rcal=(A, X, B)=>{
        let R= calMultiR(A,X);
        for (let i=0;i<size;i++){
            R[i] -= B[i];
        }
        return R;
    }
    const Dcal=( R,alp, D)=>{
        let Dnew= [];
        for (let i = 0; i < size; i++) {
            Dnew.push(0);
        }
        for (let i=0;i<size;i++){
            Dnew[i] = -1 * R[i] + alp * D[i];
        }
        return Dnew;
    }

    const checkError = (R,E) =>{
        let test= Math.sqrt(sum(R,R));
        if (test<E){
            return false;
        }
        else {
            return true;
        }
    }

    const calculator = async()=> {
        let arr = JSON.parse(JSON.stringify(matrix));
        let output = JSON.parse(JSON.stringify(b));
        let X = [];
        let D = [];
        let R = [];
        let eps=0.000001,alp,lam;
        let iter=1,i=0;
        for (let i = 0; i < size; i++) {
            X.push(0);
            D.push(0);
        }
        R = calMultiR(arr,X);
        for (i=0;i<size;i++){
            R[i] -= output[i];
            D[i] = R[i] * -1;

        }
        lam = Lamdacal(D,R,arr);
        X = Xcal(X,lam,D);
        R = Rcal(arr,X,output);
        alp = alphacal(R,arr,D);
        D = Dcal(R,alp,D);
        while (checkError(R,eps)){
            lam = Lamdacal(D,R,arr);
            X = Xcal(X,lam,D);
            R = Rcal(arr,X,output);
            alp = alphacal(R,arr,D);
            D = Dcal(R,alp,D);
            iter++;
        }
        console.log(iter)
        setResult(X);
        const payload = {
            size:size,
            matrixA:matrix,
            matrixB:b,
            method: "conjugate",
          };
      
          //2 create function fetch
          await fetch(`${backEndUrl}/matrix`, {
            method: "POST",
            body: JSON.stringify(payload),
          });
    }
    
    return(
        <Card>
            <h1>Conjugate Gradient</h1>
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

export default ConjugateGradient;