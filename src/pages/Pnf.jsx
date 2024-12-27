import React from 'react'
import { Link } from 'react-router-dom'

const Pnf = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{minHeight:"70vh"}}>
        <img width={"400px"} src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif" alt="" />
        <h3>Page Not Found</h3>
        <Link to={'/'} className='btn btn-success'>Go to home</Link>
    </div>
  )
}

export default Pnf