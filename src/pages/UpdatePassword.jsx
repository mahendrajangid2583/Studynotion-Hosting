import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { HiArrowLongLeft } from "react-icons/hi2";

const UpdatePassword = () => {

    const location = useLocation()
    const dispatch = useDispatch();
    const {loading} = useSelector((state)=>state.auth)


    const [formData, setFormData] = useState({
        password:'',
        confirmPassword:''
    })
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const{password,confirmPassword} = formData;
    const [passwordUpdated, setPasswordUpdated] = useState(false);

    const handlerOnChange = (e)=>{
        setFormData((prev)=>(
            {
                ...prev ,[e.target.name]: e.target.value
            }
        ))
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        console.log("token ",token)
        dispatch(resetPassword(password,confirmPassword,token, setPasswordUpdated))
    }
  return (
    <div className=' h-[90vh] flex flex-col justify-center items-center'>

       {
        loading ? (<div className=' text-white'>loading...</div>):(
           <div> {
                !passwordUpdated ? (
                    <div className=' flex flex-col gap-3 md:w-[508px] w-11/12 md:p-6'>
                        <h1 className=' text-3xl font-semibold text-richblack-25'>Choose  new password</h1>
                        <p className=' text-base font-normal text-richblack-200'>
                            Almost done. Enter your new password and youre all set.
                        </p>
                        <form onSubmit={submitHandler}
                          className='flex flex-col items-start gap-2 mt-5'>
                            <label className=' relative w-full'>
                                <p className=' text-sm font-normal text-richblack-200'>
                                  New password <span className=' text-[#ff0000]'>*</span>
                                </p>
                                <input
                                    required
                                    type={showPassword? "text":"password"}
                                    name='password'
                                    value={password}
                                    onChange={handlerOnChange}
                                    placeholder='Enter new password'
                                    className=' text-richblack-50 bg-richblack-700 rounded-md text-[16px] 
                                    font-medium p-3 border-b-2 border-b-richblack-500
                                    w-full mt-2'
                                />
                                <div className='absolute right-3 bottom-4 text-richblack-200 text-xl cursor-pointer'
                                    onClick={()=>{setShowPassword((prev) => !prev)}}>
                                    {
                                        showPassword ? <IoMdEye/> : <IoIosEyeOff/>
                                    }
                                </div>

                            </label>
                            <label className=' relative w-full'>
                                <p className=' text-sm font-normal text-richblack-200'>
                                  Confirm New password <span className=' text-[#ff0000]'>*</span>
                                </p>
                                <input
                                    required
                                    type={showConfirmPassword? "text":"password"}
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={handlerOnChange}
                                    placeholder=' Confirm new password'
                                    className=' text-richblack-50 bg-richblack-700 rounded-md text-[16px] 
                                    font-medium p-3 border-b-2 border-b-richblack-500
                                    w-full mt-2 '
                                />
                                <div className='absolute right-3 bottom-4 text-richblack-200 text-xl cursor-pointer'
                                    onClick={()=>{setShowConfirmPassword((prev) => !prev)}}>
                                    {
                                        showConfirmPassword ? <IoMdEye/> : <IoIosEyeOff/>
                                    }
                                </div>
                            </label>
                            <button  type='submit'
                                className=' bg-yellow-100 w-full  rounded-md text-[16px] text-richblack-900 
                                  font-medium p-3 border-b-2 border-b-yellow-50 mt-7 hover:scale-95 
                                 transition-all duration-200 '>
                                Reset Password
                            </button>
                        </form>
                        <Link to={"/login"}>
                            <p className=' flex items-center gap-2 text-richblack-50 mt-2 hover:text-richblack-5
                                            transition-all duration-200 '>
                                <HiArrowLongLeft size={25} />
                                Back to login
                            </p>
                        </Link>
                    </div>
                ):(
                    <div className=' flex flex-col gap-3 md:w-[508px] w-11/12 md:p-6'>
                       <h1 className=' text-3xl font-semibold text-richblack-25'>Reset Complete!</h1>
                       <p className=' text-base font-normal text-richblack-200'>
                          All done! We have sent an email to confirm
                       </p>
                       <Link to={"/login"}>
                        <button className=' bg-yellow-100 w-full  rounded-md text-[16px] text-richblack-900 
                                  font-medium p-3 border-b-2 border-b-yellow-50 mt-7 hover:scale-95 
                                 transition-all duration-200 '>Return to login</button>
                       </Link>
                       <Link to={"/login"}>
                            <p className=' flex items-center gap-2 text-richblack-50 mt-2 hover:text-richblack-5
                                            transition-all duration-200 '>
                                <HiArrowLongLeft size={25} />
                                Back to login
                            </p>
                        </Link>
                    </div>
                )
            }
            </div>
            
        )
       }
        
    </div>
  )
}

export default UpdatePassword