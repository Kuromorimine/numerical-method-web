import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
//import axios from "axios";
// math.import(require('mathjs-simple-integral'));

function CompositeSimpsonsRule() {

    const recur = (round, base, H, last) => {
        if (round == 0 || last <= base) {
            return 0;
        }
        else {
            return parseFloat(Fx(parseFloat(base))) + recur(parseInt(round) - 1, parseFloat(base) + 2 * parseFloat(H), parseFloat(H), last);
        }
    }

    const Fx = (input) => {
        return parseFloat(evaluate(Equation, { x: input }));
    }
    const FxIntegated = (input) => {
        // return evaluate(math.integral(Equation, 'x'),{x : input});
    }


    const calError = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const CalCompositeSimpsonsRule = () => {

        let a = A, b = B, n = N;
        let H = (b - a) / parseInt(n);
        let output = (H / 3) * (Fx(a) + Fx(b) + (4 * recur(parseInt(n) - 1, a + H, H, b)) + (2 * recur(parseInt(n) - 2, a + 2 * H, H, b)));
        let integral = FxIntegated(b) - FxIntegated(a);
        let error = calError(output, integral);

        setX(output);
    }

    const [Equation, setEquation] = useState("x^7 + 2*x^3 - 1")
    const [X, setX] = useState(0)
    const [B, setB] = useState(0)
    const [A, setA] = useState(0)
    const [N, setN] = useState(0)

    const inputEquation = (event) => {
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputB = (event) => {
        setB(parseFloat(event.target.value))
    }

    const inputA = (event) => {
        console.log(parseFloat(event.target.value))
        setA(parseFloat(event.target.value))
    }

    const inputN = (event) => {
        setN(parseFloat(event.target.value))
    }

    return (
        <Container>
            <h1>Composite Simpson's Rule</h1>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input B</Form.Label>
                    <input type="number" id="B" onChange={inputB} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input A</Form.Label>
                    <input type="number" id="A" onChange={inputA} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input N</Form.Label>
                    <input type="number" id="N" onChange={inputN} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                </Form.Group>
                <Container className="text-center">
                    
                    <Button variant="dark" onClick={CalCompositeSimpsonsRule}>
                        Calculate
                    </Button>
                </Container>
            </Form>
            <br></br>

            <Container className="text-center">
                <h5>Answer = {X.toPrecision(7)}</h5>
            </Container>

        </Container>
    );
}

export default CompositeSimpsonsRule;