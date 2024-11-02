import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/home.css"
import { PrismaClient } from '@prisma/client';

const menu = [
    { label: "Graphical", link: "/Graphical" },
    { label: "Bisection", link: "/Bisection" },
    { label: "Falseposition", link: "/Falseposition" },
    { label: "Onepoint", link: "/Onepoint" },
    { label: "NewtonRaphson", link: "/NewtonRaphson" },
    { label: "Secant", link: "/Secant" },
    { label: "CramerRule", link: "/Cramer" },
    { label: "Gaussian",link:"/Gauss"},
    { label: "GaussJordan", link:"GaussJordan"},
    { label: "MatrixInversion",link:"MatrixInversion"},
    { label: "LU",link:"LU"},
    { label: "Jacobi",link:"Jacobi"},
    { label: "GaussSeidei",link:"GaussSeidel"},
    { label: "ConjugateGradient",link:"ConjugateGradient"},
    { label: "NewtonDivided", link: "/NewtonDivided"},
    { label: "Langange", link:"/Langange"},
    { label: "Spline", link:"/Spline"},
    { label: "Linear-least-Square-Regression", link:"/Linear"},
    { label: "Polynomial-least-Square-Regression", link:"/Polynomial"},
    { label: "TrapezoidalRule",link:"/Trapezoidal"},
    { label: "CompositeTrapezoidal",link:"/CompositeTrapezoidal"},
    { label: "SimpsonRule", link:"/Simpson"},
    { label: "CompositeSimpsonRule",link:"/CompositeSimpson"}

];

const prisma = new PrismaClient();

export default function Home() {
    const addRecord = async () => {
        await fetch('http://localhost:3000/record', {
            method:"POST"
        })
}
    return (
        <>
            <div className="rootofEq">{menu.map((menu, index) => (
                <Link to={menu.link}>{menu.label}</Link>
            ))}</div>
        <button onClick={() => addRecord()}>Add Record</button>
        </>
    )
}
