import React from 'react'
import NumericalNavbar from '../Navbar';;
import "../styles/home.css"
import { PrismaClient } from '@prisma/client';
import { Link } from 'react-router-dom'


// const menu = [
//     { label: "Graphical", link: "/Graphical" },
//     { label: "Bisection", link: "/Bisection" },
//     { label: "Falseposition", link: "/Falseposition" },
//     { label: "Onepoint", link: "/Onepoint" },
//     { label: "NewtonRaphson", link: "/NewtonRaphson" },
//     { label: "Secant", link: "/Secant" },
//     { label: "CramerRule", link: "/Cramer" },
//     { label: "Gaussian",link:"/Gauss"},
//     { label: "GaussJordan", link:"GaussJordan"},
//     { label: "MatrixInversion",link:"MatrixInversion"},
//     { label: "LU",link:"LU"},
//     { label: "Jacobi",link:"Jacobi"},
//     { label: "GaussSeidei",link:"GaussSeidel"},
//     { label: "ConjugateGradient",link:"ConjugateGradient"},
//     { label: "NewtonDivided", link: "/NewtonDivided"},
//     { label: "Langange", link:"/Langange"},
//     { label: "Spline", link:"/Spline"},
//     { label: "Linear-least-Square-Regression", link:"/Linear"},
//     { label: "Polynomial-least-Square-Regression", link:"/Polynomial"},
//     { label: "TrapezoidalRule",link:"/Trapezoidal"},
//     { label: "CompositeTrapezoidal",link:"/CompositeTrapezoidal"},
//     { label: "SimpsonRule", link:"/Simpson"},
//     { label: "CompositeSimpsonRule",link:"/CompositeSimpson"}

// ];

const prisma = new PrismaClient();

export default function Home() {
    
    return (
        
            <div className="main">
                <NumericalNavbar/>
                {/* {menu.map((menu, index) => (
                <Link to={menu.link}>{menu.label}</Link>
            ))} */}
            </div>
        
        
    )
}
