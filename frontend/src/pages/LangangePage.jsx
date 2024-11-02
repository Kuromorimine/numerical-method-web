import React from 'react'
import { Link } from 'react-router-dom'
import Lagrange from '../components/interpolation/Langange'


export default function LangangePage() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Lagrange/>
    </div>
  )
}