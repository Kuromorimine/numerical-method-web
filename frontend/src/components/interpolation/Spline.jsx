import React, { useState } from "react";
import { Container, Card, Row, Col, Form, Button, ButtonGroup, ToggleButton, ToggleButtonGroup, InputGroup } from "react-bootstrap";

function Spline() {
    const [splineType, setSplineType] = useState("Linear");
    const [points, setPoints] = useState([{x: 0,y: 0,}]);
    const [size, setSize] = useState(1);
    const [xTarget, setxTarget] = useState(0);
    const [result, setResult] = useState(0);
  
    const inputSize = (event)=> {
      if(event.target.value < 1) {
        event.target.value = 1;
      }
      setSize(event.target.value);
    }
  
    const changeSize = ()=> {
      const newPoints = [...points];
      while(newPoints.length > size) {
        newPoints.pop();
      }
      for (let i = newPoints.length; i < size; i++) {
        newPoints.push({
          x: 0,
          y: 0,
        })
      }
      setPoints(newPoints);
    }
    const inputType = (value)=> {
      setSplineType(value);
    }
    const inputX = (event, index)=> {
      const newPoints = [...points];
      newPoints[index].x = event.target.value || 0;
      setPoints(newPoints);
    }
    const inputFX = (event, index)=> {
      const newPoints = [...points];
      newPoints[index].y = event.target.value || 0;
      setPoints(newPoints);
    }
    const inputxTarget = (event)=> {
      setxTarget(event.target.value);
    }
  
    const calculator = ()=> {
      let answer;
      let targetX = parseFloat(xTarget);
      const newInputs = {
        size: size,
        points: points.map(point => ({ x: point.x, y: point.y })),
        xTarget: targetX,
      }
      if (splineType == "Linear") {
        answer = CalLinearSpline(points, targetX);
      }
      else if (splineType == "Quadratic") {
        answer = CalQuadraticSpline(points, targetX);
      }
      else if (splineType == "Cubic") {
        answer = CalCubicSpline(points, targetX);
      }
      setResult(answer);
    }

    function CalLinearSpline(points, targetX) {
        const x = points.map((point) => (parseFloat(point.x)));
        const y = points.map((point) => (parseFloat(point.y)));
        
        let result;
        for (let i = 0; i < x.length - 1; i++) {
            if (targetX >= x[i] && targetX <= x[i + 1]) {
                const t = (parseFloat(targetX) - x[i]) / (x[i + 1] - x[i]);
                result = (1 - t) * y[i] + t * y[i + 1];
            }
        }
        return result
    }
    
    function CalQuadraticSpline(points, targetX) {
        const pointX = points.map((point) => (parseFloat(point.x)));
        const pointY = points.map((point) => (parseFloat(point.y)));
    
        const n = pointX.length;
        const matrixA = [];
        const matrixB = [];
    
        for (let i = 1; i < n; i++) {
            const rowMatrix = [];
            const x = pointX[i];
            const y = pointY[i];
    
            for (let j = 0; j < 3 * (i - 1); j++) rowMatrix.push(0);
            rowMatrix.push(x * x);
            rowMatrix.push(x);
            rowMatrix.push(1);
            for (let j = 0; j < 3 * (n - i); j++) rowMatrix.push(0);
            matrixA.push(rowMatrix);
            matrixB.push(y);
    
            const rowMatrix2 = [];
            for (let j = 0; j < 3 * (i - 1) + 3; j++) rowMatrix2.push(0);
            rowMatrix2.push(x * x);
            rowMatrix2.push(x);
            rowMatrix2.push(1);
            for (let j = 0; j < 3 * (n - i - 1); j++) rowMatrix2.push(0);
            matrixA.push(rowMatrix2);
            matrixB.push(y);
        }
    
        {
            const rowMatrix = [];
            const x = pointX[0];
            const y = pointY[0];
            rowMatrix.push(x * x);
            rowMatrix.push(x);
            rowMatrix.push(1);
            for (let j = 0; j < 3 * (n - 1); j++) rowMatrix.push(0);
            matrixA.push(rowMatrix);
            matrixB.push(y);
    
            const rowMatrix2 = [];
            for (let j = 0; j < 3 * (n - 1); j++) rowMatrix2.push(0);
            const x2 = pointX[n - 1];
            const y2 = pointY[n - 1];
            rowMatrix2.push(x2 * x2);
            rowMatrix2.push(x2);
            rowMatrix2.push(1);
            matrixA.push(rowMatrix2);
            matrixB.push(y2);
        }
    
        for (let i = 1; i < n; i++) {
            const rowMatrix = [];
            const x = pointX[i];
    
            for (let j = 0; j < 3 * (i - 1); j++) rowMatrix.push(0);
            rowMatrix.push(2 * x);
            rowMatrix.push(1);
            rowMatrix.push(0);
            rowMatrix.push(-2 * x);
            rowMatrix.push(-1);
            rowMatrix.push(0);
            for (let j = 0; j < 3 * (n - i - 1); j++) rowMatrix.push(0);
            matrixA.push(rowMatrix);
            matrixB.push(0);
        }
    
        {
            const rowMatrix = [];
            rowMatrix.push(1);
            rowMatrix.push(0);
            rowMatrix.push(0);
            for (let j = 0; j < 3 * (n - 1); j++) rowMatrix.push(0);
            matrixA.push(rowMatrix);
            matrixB.push(0);
        }
    
        for (let i = 0; i < matrixA.length; i++) {
            matrixA[i].push(matrixB[i]);
        }
    
        const matrixRREF = rref(matrixA);
    
        const answers = new Array(matrixRREF.length);
        for (let i = 0; i < matrixRREF.length; i++) {
            answers[i] = matrixRREF[i][matrixRREF[i].length - 1];
        }
    
        let result = -1;
    
        for (let i = 0; i < n - 1; i++) {
            const a = answers[i * 3];
            const b = answers[i * 3 + 1];
            const c = answers[i * 3 + 2];
            if (targetX >= pointX[i] && targetX <= pointX[i + 1]) {
                result = a * targetX * targetX + b * targetX + c;
            }
        }
    
        return result;
    }
    
    function CalCubicSpline(points, targetX) {
        const x = points.map((point) => (parseFloat(point.x)));
        const y = points.map((point) => (parseFloat(point.y)));
    
        const n = x.length;
        const h = Array(n - 1);
        const alpha = Array(n - 1);
        const l = Array(n);
        const mu = Array(n - 1);
        const z = Array(n);
    
        for (let i = 0; i < n - 1; i++) {
            h[i] = x[i + 1] - x[i];
            alpha[i] = (3 / h[i]) * (y[i + 1] - y[i]) - (3 / h[i - 1]) * (y[i] - y[i - 1]);
        }
    
        l[0] = 1;
        mu[0] = 0;
        z[0] = 0;
    
        for (let i = 1; i < n - 1; i++) {
            l[i] = 2 * (x[i + 1] - x[i - 1]) - h[i - 1] * mu[i - 1];
            mu[i] = h[i] / l[i];
            z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
        }
    
        l[n - 1] = 1;
        z[n - 1] = 0;
        const c = Array(n);
        const b = Array(n - 1);
        const d = Array(n - 1);
    
        c[n - 1] = 0;
        for (let j = n - 2; j >= 0; j--) {
            c[j] = z[j] - mu[j] * c[j + 1];
            b[j] = (y[j + 1] - y[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
            d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
        }
    
        let result;
        for (let i = 0; i < n - 1; i++) {
            if (targetX >= x[i] && targetX <= x[i + 1]) {
                const xDiff = targetX - x[i];
                const a = y[i];
                result = a + b[i] * xDiff + c[i] * xDiff ** 2 + d[i] * xDiff ** 3;
                break;
            }
        }
    
        return result;
    }
    
    function rref(matrix) {
        let lead = 0;
        const rowCount = matrix.length;
        const colCount = matrix[0].length;
    
        for (let r = 0; r < rowCount; r++) {
            if (lead >= colCount) return matrix;
    
            let i = r;
            while (matrix[i][lead] === 0) {
                i++;
                if (i === rowCount) {
                    i = r;
                    lead++;
                    if (colCount === lead) return matrix;
                }
            }
    
            let temp = matrix[i];
            matrix[i] = matrix[r];
            matrix[r] = temp;
    
            let val = matrix[r][lead];
            for (let j = 0; j < colCount; j++) {
                matrix[r][j] /= val;
            }
    
            for (let i = 0; i < rowCount; i++) {
                if (i === r) continue;
                val = matrix[i][lead];
                for (let j = 0; j < colCount; j++) {
                    matrix[i][j] -= val * matrix[r][j];
                }
            }
            lead++;
        }
        return matrix;
    }
  return (
    <Container>
      <Card>
        <Card.Header>Spline</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Col xs={2}>
                <Form.Label>Number of points</Form.Label>
                <ButtonGroup>
                  <Form.Control type="number" onChange={inputSize} value={size}></Form.Control>
                  <Button onClick={changeSize}>Set</Button>
                </ButtonGroup>
              </Col>

              <Col>
                <Form.Label>Spline type</Form.Label>
                <div>
                  <ToggleButtonGroup name="splineType" type="radio" value={splineType} onChange={inputType}>
                    <ToggleButton id="t-1" value="Linear" variant="outline-primary">Linear</ToggleButton>
                    <ToggleButton id="t-2" value="Quadratic" variant="outline-primary">Quadratic</ToggleButton>
                    <ToggleButton id="t-3" value="Cubic" variant="outline-primary">Cubic</ToggleButton>
                  </ToggleButtonGroup>
                </div>
                
              </Col>
            </Form.Group>
            {points.map((input, index)=> (
              <Form.Group as={Row} key={index} className="mb-3">
                <Col>
                  <InputGroup>
                    <InputGroup.Text>{"x"+index}</InputGroup.Text>
                    <Form.Control value={points[index].x} onChange={(e)=> inputX(e, index)}></Form.Control>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroup.Text>{"fx"+index}</InputGroup.Text>
                    <Form.Control value={points[index].y} onChange={(e)=> inputFX(e, index)}></Form.Control>
                  </InputGroup>
                </Col>
              </Form.Group>
            ))}
            <Form.Group className="mb-3">
              <Form.Label>x target</Form.Label>
              <Form.Control value={xTarget} onChange={inputxTarget}></Form.Control>
            </Form.Group>
            <InputGroup>
              <Button onClick={calculator}>Calculate</Button>
            </InputGroup>
            
          </Form>
        </Card.Body>
        <Card.Footer>Answer : {result}</Card.Footer>
      </Card>
    </Container>
    
  )
}
export default Spline;