import React from 'react'

import { Link } from 'react-router-dom'
import Newtonraphson from '../components/Newtonraphson'


export default function NewtonraphsonPage() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Newtonraphson/>
    </div>
    
  )
}
