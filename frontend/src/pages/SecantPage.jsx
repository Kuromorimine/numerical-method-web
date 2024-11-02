import React from 'react'

import { Link } from 'react-router-dom'
import Secant from '../components/rootofequation/Secant'




export default function SecantPage() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Secant/>
    </div>
    
  )
}