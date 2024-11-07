import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { setsignupData } from '../../../slices/authSlice';

import { sendOtp } from '../../../services/operations/authAPI';

const SignupForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
        accountType:'Student',
        phoneNumber:''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const onChangeHandler = (e)=>{
        setFormData((prev)=>({
            ...prev, [e.target.name] : e.target.value
        }));
    }
    console.log("sign up data",formData)
    
    const accountTypeHandler = (type)=>{
        if(formData.accountType===type){
            return
        }
        setFormData((prev)=>({
            ...prev, accountType:type
        }))
    }

    

    const submitHandler = (e)=>{
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
          }
        
        // Setting signup data to state
       // To be used after otp verification
        dispatch(setsignupData(formData))
        //send opt to verify email
        const email = formData.email
        dispatch(sendOtp(email,navigate));
        
    }

  return (
    <form onSubmit={submitHandler}
    className=' flex flex-col gap-5 mt-8'>

       <div className=' max-w-[230px] bg-richblack-600 rounded-full flex justify-between gap-2 p-1 mb-3
            border-b-2 border-b-richblack-500'>
        <div className={` cursor-pointer px-[18px] py-[6px] rounded-full ${formData.accountType==="Student"? 
                   ("bg-richblack-900 text-richblack-25"):
                   (" text-richblack-100")}`}
                   
                onClick={()=>accountTypeHandler("Student")} >
            Student
        </div>
        <div className={`cursor-pointer px-[18px] py-[6px] rounded-full ${formData.accountType==="Instructor"? 
                   ("bg-richblack-900 text-richblack-25"):
                   (" text-richblack-100")}`}
                      
                   onClick={()=>accountTypeHandler("Instructor")} >
            Instructor
        </div>
       </div>

       <div  className='flex flex-col lg:flex-row gap-5'>
        <label>
            <p className='text-sm font-normal text-richblack-50 mb-2'>
               First Name <span className=' text-[#ff0000]'>*</span>
            </p>
            <input
                type='text'
                required
                name='firstName'
                value={formData.firstName}
                placeholder='Enter first name'
                onChange={onChangeHandler}
                className=' p-3 rounded-md bg-richblack-800 w-full text-base text-richblack-50 border-b-2 
                       border-b-richblack-500 '
            />
        </label>
        <label>
            <p className='text-sm font-normal text-richblack-50 mb-2'>
               Last Name <span className=' text-[#ff0000]'>*</span>
            </p>
            <input
                type='text'
                required
                name='lastName'
                value={formData.lastName}
                placeholder='Enter last name'
                onChange={onChangeHandler}
                className=' p-3 rounded-md bg-richblack-800 w-full text-base text-richblack-50 border-b-2 
                       border-b-richblack-500'
            />
        </label>
       </div>
       <label>
            <p className='text-sm font-normal text-richblack-50 mb-2'>
               Email Address <span className=' text-[#ff0000]'>*</span>
            </p>
            <input
                type='text'
                required
                name='email'
                value={formData.email}
                placeholder='Enter your email'
                onChange={onChangeHandler}
                className=' p-3 rounded-md bg-richblack-800 w-full text-base text-richblack-50 border-b-2 
                       border-b-richblack-500'
            />
        </label>
        
        <div className=' flex flex-col lg:flex-row gap-4'>
            <label className=' relative'>
                <p className='text-sm font-normal text-richblack-50 mb-2'>
                Create Password <span className=' text-[#ff0000]'>*</span>
                </p>
                <input
                    type={showPassword ? ("text"):("password")}
                    required
                    name='password'
                    value={formData.password}
                    placeholder='Enter Password'
                    onChange={onChangeHandler}
                    className=' p-3 rounded-md bg-richblack-800 w-full text-base text-richblack-50 border-b-2 
                        border-b-richblack-500'
                />
                <div className='absolute right-3 bottom-4 text-richblack-200 text-xl cursor-pointer'
                onClick={()=>{setShowPassword((prev) => !prev)}}>
                {
                    showPassword ? <IoMdEye/> : <IoIosEyeOff/>
                }
                </div>
            </label>
            <label className=' relative'>
                <p className='text-sm font-normal text-richblack-50 mb-2'>
                Confirm Password <span className=' text-[#ff0000]'>*</span>
                </p>
                <input
                    type={showConfirmPassword? "text":"password"}
                    required
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    placeholder='Confirm Password'
                    onChange={onChangeHandler}
                    className=' p-3 rounded-md bg-richblack-800 w-full text-base text-richblack-50 border-b-2 
                        border-b-richblack-500'
                />
                <div className='absolute right-3 bottom-4 text-richblack-200 text-xl cursor-pointer'
                onClick={()=>{setShowConfirmPassword((prev) => !prev)}}>
                {
                    showConfirmPassword ? <IoMdEye/> : <IoIosEyeOff/>
                }
                </div>
            </label>
        </div>

        <button className=' bg-yellow-100 border-b-2 border-b-yellow-5 py-3 rounded-lg text-base font-medium
                     text-center text-richblack-900 mt-6 hover:bg-yellow-200'
            type='submit'>
            Create Account
        </button>
        
    </form>
  )
}

export default SignupForm