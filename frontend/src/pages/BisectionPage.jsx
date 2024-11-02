import React from 'react'
import Bisection from '../components/rootofequation/Bisection'
import { Link } from 'react-router-dom'

export default function BisectionPage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <Bisection/>
    </div>
  )
}
