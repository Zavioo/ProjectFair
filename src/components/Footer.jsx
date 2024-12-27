import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div style={{height:'300px'}} className='container mt-5 w-100'>
      <div className="d-flex justify-content-between">
        <div style={{width:"400px"}} className="intro">
        <Link style={{textDecoration:"none", color:"white",fontWeight:"600"}} to={'/'}> 
              <i className="fa-brands fa-docker me-2"></i>{' '}
              Project Fair
          </Link>
          <p className='mt-3'>Designed and built with all the love in the world</p>
          <p>Currently v1.0</p>
        </div>
        <div>
          <h2 className="text-white" style={{fontWeight:"600",fontSize:"20px"}}>Links</h2>
          <Link style={{textDecoration:"none", color:"white",}} to={'/'}> 
              Home
          </Link> <br />
          <Link style={{textDecoration:"none", color:"white",}} to={'/login'}> 
              Login
          </Link><br />
          <Link style={{textDecoration:"none", color:"white",}} to={'/register'}> 
              Register
          </Link>
        </div>
        <div>
        </div>
        <div className="contact">
        <h2 className="text-white" style={{fontWeight:"600",fontSize:"20px"}}>Contact Us</h2>
        <input type="text" placeholder='Enter your email here' className='rounded h-25 text-center'  />
        <button className='btn btn-info ms-1 h-25'><i className="fa-solid fa-arrow-right  " ></i>
        </button>
        <br />
        <div className='d-flex  justify-content-evenly mt-3'>
        <i class="fa-solid fa-envelope"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-linkedin"></i>
        <i class="fa-brands fa-github"></i>
        <i class="fa-solid fa-phone"></i>
        </div>
       
        </div>
      </div>
    </div>
  )
}

export default Footer