import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import Profileimg from '../assets/Profileimg.png'
import SERVER_URL from '../services/serverURL'
import { updateUserAPI } from '../services/allAPI'

const Profile = () => {

  const [preview,setPreview] = useState("")
  const [existingProfileImg,setExistingProfileImg] = useState("")
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profilePic:""
  })
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin
      })
      setExistingProfileImg(user.profilePic)
    }
  },[open])

  useEffect(()=>{
    if(userDetails.profilePic){
      setPreview(URL.createObjectURL(userDetails.profilePic))

    }else{
      setPreview("")
    }
  },[userDetails.profilePic])


  const handleUpdateProfile =async ()=>{
    const {username,email,password,github,linkedin,profilePic} = userDetails
    if(github && linkedin){
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profilePic",profilePic):reqBody.append("profilePic",existingProfileImg)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        // api call
        try{
          const result = await updateUserAPI(reqBody,reqHeader)
          if(result.status==200){
            alert("User Profile update successfully!!!")
            sessionStorage.setItem("user",JSON.stringify(result.data))
            setOpen(!open)
          }else{
            console.log(result);
            
          }

        }catch(err){
          console.log(err);
          
        }

      }

    }else{
      alert("Please fill the form completely!!!")
    }
  }

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <h3 className="text-warning">Profile</h3>
        <button onClick={() => setOpen(!open)} className="btn text-warning"><i className="fa-solid fa-chevron-down"></i></button>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text" className='row align-items-center justify-content-center container-fluid shadow p-2 rounded '>
          <label className='text-center'>
            <input onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} type="file" style={{ display: "none" }} />
            {
              existingProfileImg == ""?
              <img src={preview?preview:Profileimg} width={"200px"} height={"200px"} alt=""  className='rounded-circle'/>
              :
              <img src={preview?preview:`${SERVER_URL}/uploads/${existingProfileImg}`} width={"200px"} height={"200px"} alt=""  className='rounded-circle'/>

            }
          </label>
          <div className="mt-2 mb-2 w-100">
            <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} type="text" placeholder='User Github Plofile Link' className='form-control' />
          </div>
          <div className="mb-2 w-100">
            <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} type="text" placeholder='User LinkedIn Plofile Link' className='form-control' />
          </div>
          <div className="d-grid w-100">
            <button onClick={handleUpdateProfile} className="btn btn-warning">Update Profile</button>          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile