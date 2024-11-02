import React from 'react'
import { Link } from 'react-router-dom'
import SimpsonsRule from '../components/Differentiation/Simpson'

export default function SimpsonPage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <SimpsonsRule />
    </div>
  )
}
