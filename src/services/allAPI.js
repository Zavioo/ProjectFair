import commonAPI from "./commonAPI"
import SERVER_URL from "./serverURL"


// registerAPI called by Auth
export const registerAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

// loginAPI called by Auth
export const loginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

// addProjectAPI called by Add component 
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-projects`,reqBody,reqHeader)
}


// getHomeProjectAPI called by Home component when page loaded in browser(useEffect)
export const getHomeProjectAPI =async()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-project`,{})
}

// allProjectAPI called by project component when page loaded in browser(useEffect)
export const allProjectAPI =async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,{},reqHeader)
}

// userProjectAPI called by view component when page loaded in browser(useEffect)
export const userProjectAPI =async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,{},reqHeader)
}

// updateProjectAPI called by Edit component when user click update btn -  projects/6725f7cb41249b8b0e725311/edit
export const updateProjectAPI =async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/projects/${id}/edit`,reqBody,reqHeader)
}

// userProjectRemoveAPI called by view component when user click delete button
export const userProjectRemoveAPI =async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/projects/${id}/remove`,{},reqHeader)
}


// updateUserAPI called by profile component when user click update btn -  edit-user
export const updateUserAPI =async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}