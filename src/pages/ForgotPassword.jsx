import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { getResetPasswordToken } from '../services/operations/authAPI';

const ForgotPassword = () => {
    const {loading} = useSelector((state)=>state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();

    const handleOnSubmit = (e)=>{
         e.preventDefault();
         dispatch(getResetPasswordToken(email,setEmailSent))
    }

  return (
    <div className='h-[90vh] flex flex-col items-center justify-center text-white'>
      {
        loading ? (<div>loading...</div>):
        (
            <div className=' flex flex-col gap-3 md:w-[508px] w-11/12 md:p-6'>
                <h1 className=' text-3xl font-semibold text-richblack-25'>
                    { 
                       !emailSent ? "Reset Your Password": "Check Your Email"
                    }
                </h1>

                <p className=' text-base font-normal text-richblack-200'>
                    {
                        !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                        :`We have sent the reset email to ${email}`
                    }
                </p>
                <form onSubmit={handleOnSubmit}
                   className='flex flex-col items-start gap-2 mt-5'>
                    {
                        !emailSent && (
                            <label className=' w-full'>
                               <p className=' text-sm font-normal text-richblack-200'>
                                  Email Address <span className=' text-[#ff0000]'>*</span>
                                </p>
                               <input
                                  type='email'
                                  required
                                  name='email'
                                  value={email}
                                  placeholder='Enter email address'
                                  onChange={(e)=>setEmail(e.target.value)}
                                  className=' text-richblack-50 bg-richblack-700 rounded-md text-[16px] 
                                  font-medium p-3 border-b-2 border-b-richblack-500
                                   w-full mt-2'
                               />
                            </label>
                        )
                    }
                    <button type='submit'
                        className=' bg-yellow-100 w-full  rounded-md text-[16px] text-richblack-900 
                                  font-medium p-3 border-b-2 border-b-yellow-50 mt-7 hover:scale-95 
                                 transition-all duration-200 '>
                        {
                            !emailSent ? "Reset Password" : "Resend Email"
                        }
                    </button>
                </form>
                <div>
                    <Link to={"/login"}>
                       <p className=' flex items-center gap-2 text-richblack-50 mt-2 hover:text-richblack-5
                                     transition-all duration-200 '>
                       <HiArrowLongLeft size={25} />
                       Back to login
                       </p>
                    </Link>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default ForgotPassword