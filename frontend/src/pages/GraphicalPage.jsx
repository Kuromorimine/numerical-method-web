import React from 'react'
import Graphical from '../components/rootofequation/Graphical'
import { Link } from 'react-router-dom'


export default function GraphicalPage() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Graphical/>
    </div>
    
  )
}
