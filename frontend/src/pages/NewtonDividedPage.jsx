import React from 'react'
import { Link } from 'react-router-dom'
import NewtonDivided from '../components/interpolation/NewtonDivided'

export default function NewtonDividedPage() {
  return (
    <div>
      <Link to="/">Home</Link>
      <NewtonDivided/>
    </div>
  )
}
