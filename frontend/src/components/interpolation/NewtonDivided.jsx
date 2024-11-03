import React, { Component } from "react";
import { Form, Button, Row, Col, InputGroup, Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

const backEndUrl = "http://localhost:3000";
class NewtonDivided extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataX: [0, 20000, 40000, 60000, 80000],
            dataY: [9.81, 9.7487, 9.6879, 9.6879, 9.5682],
            selectedIndex: [0, 4],
            level: 2,
            xInput: 0,
            size: 5,
            result: 0,
        };
    }

    inputSize = (event) => {
        if (event.target.value >= 2) {
            this.setState({ size: event.target.value });
        }
    }

    inputLevel = (event) => {
        if (event.target.value >= 2) {
            if (event.target.value > this.state.size) {
                this.setState({ level: this.state.size });
            } else {
                this.setState({ level: event.target.value });
            }
        }
    }

    inputX = (event) => {
        this.setState({ xInput: event.target.value });
    }

    inputIndex = () => {
        const array = [];
        for (let i = 0; i < this.state.level; i++) {
            array.push(0);
        }
        this.setState({ selectedIndex: array });
    }

    inputArraySize = () => {
        const array = [];
        for (let i = 0; i < this.state.size; i++) {
            array.push(0);
        }
        this.setState({
            dataX: array,
            dataY: array
        });
    }

    inputSelectedIndex = (event, index) => {
        const newIndex = [...this.state.selectedIndex];
        newIndex[index] = event.target.value;
        this.setState({ selectedIndex: newIndex });
    }

    inputDataX = (event, index) => {
        const newX = [...this.state.dataX];
        newX[index] = event.target.value;
        this.setState({ dataX: newX });
    }

    inputDataY = (event, index) => {
        const newY = [...this.state.dataY];
        newY[index] = event.target.value;
        this.setState({ dataY: newY });
    }

    insideCal = (xnew, x, round) => {
        if (round - 1 < 0) {
            return 1;
        } else {
            return (xnew - x[round - 1]) * this.insideCal(xnew, x, round - 1);
        }
    }

    calNewY = (C, xnew, x, round) => {
        if (round === 0) {
            return C[0];
        } else {
            return (C[round] * this.insideCal(xnew, x, round)) + this.calNewY(C, xnew, x, round - 1);
        }
    }

    recurr = (round, idx0, idx1, y, x) => {
        if (round === 0) {
            return y[idx0];
        } else if (round === 1) {
            return (y[idx1] - y[idx0]) / (x[idx1] - x[idx0]);
        } else {
            return (this.recurr(round - 1, idx0 + 1, idx1, y, x) - this.recurr(round - 1, idx0, idx1 - 1, y, x)) / (x[idx1] - x[idx0]);
        }
    }

    calculator = async() => {
        let output;
        let iter = this.state.level - 1;
        let input = this.state.xInput;
        let X = [];
        let Y = [];
        let C = [];
        let index = [...this.state.selectedIndex.sort((a, b) => a - b)];
        index.forEach((item) => {
            X.push(this.state.dataX[item]);
            Y.push(this.state.dataY[item]);
        });

        for (let i = 0; i < X.length; i++) {
            C.push(0);
        }

        for (let i = 0; i < iter + 1; i++) {
            C[i] = parseFloat(this.recurr(i, 0, i, Y, X));
        }

        output = this.calNewY(C, input, X, iter);
        this.setState({ result: output });
        const payload = {
            sizearray:this.state.size,
            arrayx: this.state.dataX,
            arrayy:this.state.dataY,
            inputindex:this.state.level,
            indexleft:this.state.selectedIndex[0],
            indexright:this.state.selectedIndex[1],
            inputx:this.state.xInput,
            method: "newtondivided",
          };
      
          //2 create function fetch
          await fetch(`${backEndUrl}/interpolation`, {
            method: "POST",
            body: JSON.stringify(payload),
          });
    }

    render() {
        return (
            <Container>
                <form>
                    <h1>Newton Divided Differences</h1>
                    <InputGroup>
                        <Col xs={2}>
                            <Form.Label className="text-center">Size of Array</Form.Label>
                        </Col>
                        <Row>
                            <Form.Control type="number" value={this.state.size} onChange={this.inputSize}></Form.Control>
                        </Row>
                        <Row>
                            <Button variant="dark" onClick={this.inputArraySize}>set</Button>
                        </Row>
                    </InputGroup>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th></th>
                                {Array.from({ length: this.state.dataX.length }).map((_, index) => (
                                    <th key={index}>{index}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>X</td>
                                {this.state.dataX.map((_, index) => (
                                    <td key={index}>
                                        <Form.Control value={this.state.dataX[index]} onChange={(e) => this.inputDataX(e, index)}></Form.Control>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>Y</td>
                                {this.state.dataY.map((_, index) => (
                                    <td key={index}>
                                        <Form.Control value={this.state.dataY[index]} onChange={(e) => this.inputDataY(e, index)}></Form.Control>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>

                    <InputGroup>
                        <Col xs={2}>
                            <Form.Label>Input Index</Form.Label>
                        </Col>
                        <Row>
                            <Form.Control type="number" value={this.state.level} onChange={this.inputLevel}></Form.Control>
                        </Row>
                        <Row>
                            <Button variant="dark" onClick={this.inputIndex}>set</Button>
                        </Row>
                    </InputGroup>

                    <Table responsive>
                        <thead>
                            <tr>
                                <th></th>
                                {Array.from({ length: this.state.level }).map((_, index) => (
                                    <th key={index}>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Index</td>
                                {this.state.selectedIndex.map((_, index) => (
                                    <td key={index}>
                                        <Form.Control value={this.state.selectedIndex[index]} onChange={(e) => this.inputSelectedIndex(e, index)}></Form.Control>
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
                                    <Form.Control value={this.state.xInput} onChange={this.inputX}></Form.Control>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Container className="text-center">
                        <Col>
                            <Button variant="primary" onClick={this.calculator}>Calculate</Button>
                        </Col>
                    </Container>
                </form>
                <Container className="text-center">
                    <h3>Answer = {parseFloat(this.state.result)}</h3>
                </Container>
            </Container>
        );
    }
}

export default NewtonDivided;
