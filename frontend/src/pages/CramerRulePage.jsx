import React from 'react'
import { Link } from 'react-router-dom'
import Cramer from '../components/AXB/cramer'

function CramerRulePage(){ 
    return(
        <div>
            <Link to="/">Home</Link>
            <Cramer/>
        </div>
    )
}
export default CramerRulePage;