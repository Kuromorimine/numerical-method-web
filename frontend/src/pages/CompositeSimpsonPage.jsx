import React from 'react'
import { Link } from 'react-router-dom'
import CompositeSimpsonsRule from '../components/Differentiation/CompositeSimpson'

export default function CompositeSimpsonPage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <CompositeSimpsonsRule/>
    </div>
  )
}
