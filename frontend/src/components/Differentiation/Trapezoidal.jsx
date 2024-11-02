import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { evaluate } from 'mathjs';
//import axios from 'axios';

class TrapezoidalRule extends Component {
    constructor() {
        super();
        this.state = {
            Equation: "(4*x^5) - (3*x^4) + (x^3) - (6*x) + 2",
            X: 0,
            B: 0,
            A: 0,
        };
    }

    inputEquation = (event) => {
        this.setState({ Equation: event.target.value });
    }

    inputB = (event) => {
        this.setState({ B: event.target.value });
    }

    inputA = (event) => {
        this.setState({ A: event.target.value });
    }

    Fx = (input) => {
        return evaluate(this.state.Equation, { x: input });
    }

    FxIntegrated = (input) => {
        // You can uncomment and use the appropriate library or code for calculating integrals.
        // return evaluate(math.integral(this.state.Equation, 'x'), { x: input });
    }

    calError = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    CalTrapezoidalRule = () => {
        let a = parseFloat(this.state.A);
        let b = parseFloat(this.state.B);

        let output = ((b - a) / 2) * (this.Fx(a) + this.Fx(b));
        let integral = this.FxIntegrated(b) - this.FxIntegrated(a);
        let error = this.calError(output, integral);

        this.setState({ X: output });
    }

    render() {
        return (
            <Container>
                <h1>Trapezoidal Rule</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={this.state.Equation} onChange={this.inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control" />
                        <Form.Label>Input B</Form.Label>
                        <input type="number" id="B" onChange={this.inputB} style={{ width: "20%", margin: "0 auto" }} className="form-control" />
                        <Form.Label>Input A</Form.Label>
                        <input type="number" id="A" onChange={this.inputA} style={{ width: "20%", margin: "0 auto" }} className="form-control" />
                    </Form.Group>
                    <Container className="text-center">
                        <Button onClick={() => {
                            axios.get("http://localhost:8080/trapezoidal").then(e => {
                                this.setState({ Equation: e.data[0].equation });
                            });
                        }}>get F(x)</Button>
                        <Button variant="dark" onClick={this.CalTrapezoidalRule}>
                            Calculate
                        </Button>
                    </Container>
                </Form>
                <br></br>
                <Container className="text-center">
                    <h5>Answer = {this.state.X.toPrecision(7)}</h5>
                </Container>
            </Container>
        );
    }
}

export default TrapezoidalRule;
