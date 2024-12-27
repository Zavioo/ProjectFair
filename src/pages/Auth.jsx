import React, { useContext, useState } from 'react'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import login from '../assets/login.png'
import { loginAPI, registerAPI } from '../services/allAPI'
import { tokenAuthContext } from '../context/AuthContextAPI'

const Auth = ({ insideRegister }) => {

  const {isAutherised,setIsAutherised} = useContext(tokenAuthContext)

  const navigate =useNavigate()
  const [isLogined,setIsLogined] = useState(false)

  const [inputData,SetInputData] = useState({
    userName:"",email:"",password:""
  })
  // console.log(inputData);

  const handleRegister = async (e)=>{
    e.preventDefault()
    if(inputData.userName&&inputData.email&&inputData.password){
      // alert("make api call")
      try{
        const result = await registerAPI(inputData)
        console.log(result);
        if(result.status==200){
          alert(`Welcome ${result.data?.username}, Please login to explore our website!!!`)
          navigate('/login')
          SetInputData({userName:"",email:"",password:""})

        }else{
          if(result.response.status==406){
            alert(result.response.data)
            SetInputData({userName:"",email:"",password:""})
          }
        }
        

      }catch(err){
        console.log(err);
        
      }

    }
    else{
      alert("Please fill the from !!!")
    }
  }

  const handlelogin = async (e)=>{
    e.preventDefault()
    if(inputData.email && inputData.password){
      console.log(inputData);
      
      try{
        const result = await loginAPI(inputData)
        if(result.status==200){
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setIsAutherised(true)
          setIsLogined(true)
          setTimeout(() => {
            SetInputData({userName:"",email:"",password:""})
            navigate('/')
            setIsLogined(false)
          }, 2000);

        }else{
          if(result.response.status==404){
            alert(result.response.data)
          }
        }

      }catch(err){
        console.log(err);
        
      }
    }else{
      alert("Please fill the form completely!!!")
    }
  }

  
  return (
    <div>
      <div className="d-flex justify-contet-center align-items-center" style={{ minHeight: '100vh', width: "100%" }}>
        <div className="container w-75">
          <div className="shadow card p-2">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img className='img-fluid' src={login} width={"400px"} alt="" />

              </div>
              <div className="col-lg-6">
                <h1 className="mt-2"><i className="fa-brands fa-docker me-2"></i>Project Fair</h1>
                <h5 className='mt-2'>Sign {insideRegister ? "Up" : "In"} to your Account</h5>
                <Form>
                  {
                    insideRegister &&
                    <FloatingLabel
                      controlId="floatingInputName"
                      label="User Name"
                      className="mb-3"
                    >
                      <Form.Control value={inputData.userName} onChange={e=>SetInputData({...inputData,userName:e.target.value})} type="text" placeholder="UserName" />
                    </FloatingLabel>
                  }
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control value={inputData.email} onChange={e=>SetInputData({...inputData,email:e.target.value})} type="email" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInputPassword"
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control value={inputData.password} onChange={e=>SetInputData({...inputData,password:e.target.value})} type="password" placeholder="Password" />
                  </FloatingLabel>
                  {
                    insideRegister ?
                    <div className="mt-3">
                      <button onClick={handleRegister} className="btn btn-primary mb-2">Register</button>
                      <p>Existing User ? Please Click here to <Link to={'/login'}>Login</Link></p>
                    </div>
                    :
                    <div className="mt-3">
                      <button onClick={handlelogin} className="btn btn-primary d-flex mb-2">Login
                      { isLogined && <Spinner className='ms-1' animation="border" variant="light" />}
                      </button>
                      <p>New User ? Please Click here to <Link to={'/register'}>Register</Link></p>
                    </div>
                  }
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth