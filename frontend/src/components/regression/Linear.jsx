import React from "react";
import { Form, Button, Row, Col, InputGroup, Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useEffect,useState } from "react";
import History from "./history";

const backEndUrl = "http://localhost:3000";
function LinearLeastSquares() {
    const [dataX, setDataX] = useState([10,15,20,30,40,50,60,70,80]);
    const [dataY, setDataY] = useState([5,9,15,18,22,30,35,38,43]);
    const [xInput, setXInput] = useState(0)
    const [size, setSize] = useState(9);
    const [result, setResult] = useState(0);
    const [allEquations, setAllEquations] = useState([]);

    const inputSize = (event)=> {
        if (event.target.value >= 2) {
            setSize(event.target.value);
        }
    }

    const inputX = (event)=> {
        setXInput(event.target.value);
    }


    const inputArraySize = ()=> {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(0);
        }
        setDataX(array);
        setDataY(array);
    }


    const inputDataX = (event, index)=> {
        const newX = [...dataX];
        newX[index] = event.target.value;
        setDataX(newX);
    }

    const inputDataY = (event, index)=> {
        const newY = [...dataY];
        newY[index] = event.target.value;
        setDataY(newY);
    }

    const gauss=(mtx)=>{
        let temp,fixed;
        for (let i=0;i< mtx.length;i++){
            fixed = mtx[i][i];
            for (let k=0;k<mtx[0].length;k++){
                mtx[i][k] /= fixed;
            }
            for (let j=0;j< mtx.length;j++){
                if (i!=j){
                    temp=mtx[j][i];
                    for (let r=0;r<mtx[0].length;r++){
                        mtx[j][r] -= mtx[i][r]*temp ;
                    }
                }
            }
        }
    }
    const linear=( X, Y, input)=>{
        let length = X.length;
        let matrix = [];
        let sum=0,output=0;

        for (let i = 0; i < 2; i++) {
            let temp = [];
            for (let i = 0; i < 3; i++) {
                temp.push(0);
            }
            matrix.push(temp);
        }


        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0;j < matrix[0].length;j++){
                if (i==j) {
                    for (let k = 0; k < length; k++) {
                        sum += Math.pow(X[k], i * 2);
                    }
                    matrix[i][j] = sum;
                } else if (j == matrix[0].length-1) {
                    for (let k = 0; k < length; k++) {
                        sum += Math.pow(Y[k], 1) * Math.pow(X[k], i);
                    }
                    matrix[i][j] = sum;
                } else {
                    for (let k = 0; k < length; k++) {
                        sum += Math.pow(X[k], (i+j));
                    }
                    matrix[i][j] = sum;
                }
                sum=0;
            }
        }
        gauss(matrix);
        for (let i = 0;i<matrix.length;i++){
            output += matrix[i][matrix[0].length-1] * Math.pow(input,i);
        }
        return output;
    }

      const calculator =async ()=> {
        let output;
        let input = xInput;
        let X = [...dataX];
        let Y = [...dataY];

        output = linear(X,Y,input)

        setResult(output);
        const payload = {
            sizearray: size,
            inputx: xInput,
            regressionarrayx:dataX,
            regressionarrayy:dataY,
            method: "linear",
          };
      
          //2 create function fetch
          await fetch(`${backEndUrl}/regression`, {
            method: "POST",
            body: JSON.stringify(payload),
          });
    }
    useEffect(() => {
        const getAllData = async () => {
          const response = await fetch(`${backEndUrl}/regression`, {
            method: "GET",
          });
    
          const data = await response.json();
          console.log(data.data);
          setAllEquations(data.data.filter((element) => element.method == 'linear'));
        };
    
        getAllData();
      }, []);
    return(
        <Container>
                <form>
                    <h1>Least-Squares Regression</h1>
                    <h2>- Linear</h2>
                    <InputGroup>
                        <Col xs={2}>
                            <Form.Label className="text-center" >Size of Array</Form.Label>
                        </Col>
                        <Row>
                            <Form.Control type="number" value={size} onChange={(e)=> {inputSize(e)}}></Form.Control>
                        </Row>
                        <Row>
                            <Button variant="dark" onClick={inputArraySize}>set</Button>
                        </Row>
                    </InputGroup>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th></th>
                            {Array.from({ length: dataX.length }).map((_, index) => (
                            <th key={index}>{index}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>X</td>
                            {dataX.map((_, index)=> (
                                    <td key={index}>
                                        <Form.Control value={dataX[index]} onChange={(e)=> inputDataX(e, index)}></Form.Control>
                                    </td>
                            ))}
                        </tr>
                        <tr>
                            <td>Y</td>
                            {dataY.map((_, index)=> (
                                    <td key={index}>
                                        <Form.Control value={dataY[index]} onChange={(e)=> inputDataY(e, index)}></Form.Control>
                                    </td>
                            ))}
                        </tr>
                        </tbody>
                    </Table>

                    <Table responsive>
                        <thead>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>X input</td>
                            <td>
                                <Form.Control value={xInput} onChange={(e)=> inputX(e)}></Form.Control>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    <Container className="text-center">
                        <Col >
                            <Button variant="primary" onClick={calculator} >Calculate</Button>
                        </Col>
                    </Container>
                   
                </form>
                <Container className="text-center">
                    <h3>Answer = {parseFloat(result)}</h3>
                    <History allEquations={allEquations}/>
                </Container>
                
        </Container>
        
    )
}

export default LinearLeastSquares;