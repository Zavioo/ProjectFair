import React, { useState,useEffect, useContext } from 'react'
import { Button, Modal } from 'react-bootstrap';
import imageUpload from '../assets/imageUpload.png'
import SERVER_URL from '../services/serverURL';
import { editProjectResponseContext } from '../context/ContextApi';
import { updateProjectAPI } from '../services/allAPI';

const Edit = ({project}) => {

  const {editProjectResponse, setEditProjectResponse} = useContext(editProjectResponseContext)
  const [preview,setPreview] = useState("")
  const [imageFileStatus,setImageFileStatus] = useState(false)
  const [projectDetails,setProjectDetails] = useState({
    id:project._id,title:project.title,language:project.language,overview:project.overview,github:project.github,website:project.website,projectImg:""
  })
  // console.log(projectDetails);

  const [show, setShow] = useState(false);

  useEffect(()=>{
    if(projectDetails.projectImg.type=="image/png" || projectDetails.projectImg.type=="image/jpg" || projectDetails.projectImg.type=="image/jpeg"){
      // valid image
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }else{
      // invalid image
      setImageFileStatus(false)
      setPreview("")
      setProjectDetails({...projectDetails,projectImg:""})
    }
  },[projectDetails.projectImg])

  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      id:project._id,title:project.title,language:project.language,overview:project.overview,github:project.github,website:project.website,projectImg:""
    })
  
  }

  const handleShow = () => {
    setShow(true);
    setProjectDetails({
      id:project._id,title:project.title,language:project.language,overview:project.overview,github:project.github,website:project.website,projectImg:""
    })
  }

  const handleUpdateProject = async()=>{
    const {id,title,language,overview,github,website,projectImg} = projectDetails
    if(title && language && overview && github && website ){
      //api call - put (id,updateDetails)
      const reqBody = new FormData() // reqbody in formdata becuse its includes file
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview? reqBody.append("projectImg",projectImg) : reqBody.append("projectImg",project.projectImg)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        // api call
        try{
          const result = await updateProjectAPI(id,reqBody,reqHeader)
          if(result.status==200){
            alert("Project update successfully!!!")
            handleClose()
            setEditProjectResponse(result)
          }

        }catch(err){
          console.log(err);
          
        }

      }
    }else{
      alert("Please fill the form completely !!!")
    }
  }

  return (
    <>
      <button onClick={handleShow} className='btn'><i className="fa-solid fa-edit"></i></button>
      <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} type="file" style={{ display: "none" }} />
                <img height={"150px"} className='img-fluid' src={preview?preview:`${SERVER_URL}/uploads/${project.projectImg}`} alt="" />
              </label>
              { !imageFileStatus && <div className="text-warning fw-bolder my-2">* Upload Only the following file types (jpeg,jpg,png) here !!!</div>}
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} type="text" placeholder='Project Title' className='form-control' />
              </div>
              <div className="mb-2">
                <input value={projectDetails.language} onChange={e=>setProjectDetails({...projectDetails,language:e.target.value})} type="text" placeholder='Language Used In Project ' className='form-control' />
              </div>
              <div className="mb-2">
                <input value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} type="text" placeholder='Project Overview' className='form-control' />
              </div>
              <div className="mb-2">
                <input value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} type="text" placeholder='Project Github Link' className='form-control' />
              </div>
              <div className="mb-2">
                <input value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} type="text" placeholder='Project Website Link' className='form-control' />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit