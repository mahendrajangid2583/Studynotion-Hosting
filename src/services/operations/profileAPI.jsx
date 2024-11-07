import { profileEndpoints } from "../apis"
import { apiConnector } from "../apiConnector"
import toast from "react-hot-toast"

const {
   GET_USER_ENROLLED_COURSES_API,
   GET_INSTRUCTOR_DATA_API
} = profileEndpoints

export async function getUserEnrolledCourses(token){
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        
        const response = await apiConnector("GET",GET_USER_ENROLLED_COURSES_API,null,
            {
                Authorization: `Bearer ${token}`
            }
        )
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        console.log("enrolled courese", response.data)
        result = response.data.data;

    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
    
}

export async function getInstructorData(token){
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET",GET_INSTRUCTOR_DATA_API,null,
            {
                Authorization:`Bearer ${token}`,
            }
        )
        console.log("GET_INSTRUCTOR_DATA_API_RESPONSE", response);
        result = response?.data?.courses;
    } catch (error) {
        console.log("GET_INSTRUCTOR_API_ERROR",error);
        toast.error("Could not get instructor data");
    }
    toast.dismiss(toastId);
    return result;
}