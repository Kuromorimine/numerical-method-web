import React from 'react'
import { Link } from 'react-router-dom'
import PolynomialLeastSquares from '../components/regression/Polynomial'

export default function PolynomialRegressionPage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <PolynomialLeastSquares/>
    </div>
  )
}
