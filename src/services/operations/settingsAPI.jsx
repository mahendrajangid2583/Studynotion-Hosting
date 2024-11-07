import { apiConnector } from "../apiConnector"
import { settingsEndpoints } from "../apis"
import { toast } from 'react-hot-toast'
import { setUser } from "../../slices/profileSlice"
import { logout } from "./authAPI"

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture( token,formData){
    return async(dispatch) => {
        const toastId = toast.loading("loading...")
        try {
            const response = await apiConnector("PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                  }
                 );

            console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
                response
              )
            if (!response.data.success) {
              throw new Error(response.data.message)
            }  

            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(response.data.data))
            localStorage.setItem("user",JSON.stringify(response.data.data));
        } catch (error) {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId)
    }
}

export function updateProfile(token,formData){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("PUT",
                UPDATE_PROFILE_API,
                formData,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })

            if(!response.data.success){
               throw new Error(response.data.message);
            }  
            
            toast.success("Profile Updated successfully")
            dispatch(setUser(response.data.updatedUserDetails));
            localStorage.setItem("user",JSON.stringify(response.data.updatedUserDetails))
        } catch (error) {
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            toast.error(`Error-${error.response.request.status}, ${error.response.data.message}`);
        }
        toast.dismiss(toastId);
    }
}

export function changePassword(token,formData,reset){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("POST",CHANGE_PASSWORD_API,
                formData,
                {
                   Authorization: `Bearer ${token}`, 
                }
            )
            if(!response.data.success){
                throw new Error(response.data.message);
             }  
             
             toast.success("Password Updated successfully");
             reset();
        } catch (error) {
            console.log("UPDATE_PASSWORD_API API ERROR............", error)
            toast.error(error?.message)
        }
        toast.dismiss(toastId);
    }
}

export function deleteAccount(token,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("DELETE",DELETE_PROFILE_API,null,
                {
                    Authorization: `Bearer ${token}`
                }
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate));
        } catch (error) {
            console.log("DELETE_PROFILE_API API ERROR............", error)
            toast.error(error?.message)
        }
        toast.dismiss(toastId);
    }
}