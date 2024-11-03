import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

function NumericalNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="./"><h3>Numerical</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* <Nav.Link href="#action1">Home</Nav.Link> */}
            <NavDropdown title="Root of Equations" id="navbarScrollingDropdown">
              <NavDropdown.Item href="./graphical">Graphical</NavDropdown.Item>
              <NavDropdown.Item href="./Bisection">Bisection</NavDropdown.Item>
              <NavDropdown.Item href="./FalsePosition">False Position</NavDropdown.Item>
              <NavDropdown.Item href="./OnePoint">One Point Iteration</NavDropdown.Item>
              <NavDropdown.Item href="./NewtonRaphson">Newton Raphson</NavDropdown.Item>
              <NavDropdown.Item href="./Secant">Secant Method</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Linear Algebraic Equations" id="navbarScrollingDropdown">
              <NavDropdown.Item href="./Cramer">Cramer Rule</NavDropdown.Item>
              <NavDropdown.Item href="./Gauss">Gaussian</NavDropdown.Item>
              <NavDropdown.Item href="./GaussJordan">Gauss-Jordan</NavDropdown.Item>
              <NavDropdown.Item href="./MatrixInversion">Matrix Inversion</NavDropdown.Item>
              <NavDropdown.Item href="./LU">LU Decomposition</NavDropdown.Item>
              <NavDropdown.Item href="./Jacobi">Jacobi iteration</NavDropdown.Item>
              <NavDropdown.Item href="./GaussSeidel">Gauss-Seidel iteration</NavDropdown.Item>
              <NavDropdown.Item href="./ConjugateGradient">Conjugate Gradient</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Interpolation" id="navbarScrollingDropdown">
              <NavDropdown.Item href="./NewtonDivided">Newton Divided Differences</NavDropdown.Item>
              <NavDropdown.Item href="./Langange">Lagange Interpolation</NavDropdown.Item>
              <NavDropdown.Item href="./Spline">Spline Interpolation</NavDropdown.Item>
              
            </NavDropdown>

            <NavDropdown title="Regression" id="navbarScrollingDropdown">
              <NavDropdown.Item href="./Linear">Least-Squares Regression : Linear</NavDropdown.Item>
              <NavDropdown.Item href="./Polynomial">Least-Squares Regression : Polynomial</NavDropdown.Item>

            </NavDropdown>

            <NavDropdown title="Integration and Differentiation" id="navbarScrollingDropdown">
              <NavDropdown.Item href="./Trapezoidal">Trapezoidal Rule</NavDropdown.Item>
              <NavDropdown.Item href="./CompositeTrapezoidal">Composite Trapezoidal Rule</NavDropdown.Item>
              <NavDropdown.Item href="./Simpson">Simpson's Rule</NavDropdown.Item>
              <NavDropdown.Item href="./CompositeSimpson">Composite Simpson's Rule</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NumericalNavbar;