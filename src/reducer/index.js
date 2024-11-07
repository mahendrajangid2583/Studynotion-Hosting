import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import modalReducer from "../slices/modalSlice";
import courseReducer from "../slices/courseSlice";
import viewCourseReducer from "../slices/viewCourseSlice";

const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart: cartReducer,
    modal:modalReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
})

export default rootReducer;