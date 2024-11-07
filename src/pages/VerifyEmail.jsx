import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HiArrowLongLeft } from "react-icons/hi2";
import { RxCountdownTimer } from "react-icons/rx";

const VerifyEmail = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading} = useSelector((state)=>state.auth);
    const [otp, setOtp] = useState("");
    console.log("otp:-",otp)
    //signup data
    const {signupData} = useSelector((state)=>state.auth);

    //check signup data received or not
    useEffect(()=>{
        if(!signupData){
            navigate("/signup")
        }
    },[])

     

    const handlerOnSubmit = (e)=>{
        e.preventDefault();
 
        // destructuring signup data
     const {
        firstName,
        lastName,
        accountType,
        email,
        password,
        confirmPassword,
    } = signupData;

        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));        
    }
  return (
    <div  className=' h-[90vh] flex flex-col justify-center items-center'>
       {
        loading? (<div className=' text-white'>Loading...</div>): (
            <div className=' flex flex-col gap-3 md:w-[508px] w-11/12 md:p-6'>
               <h1 className=' text-3xl font-semibold text-richblack-25'>Verify Email</h1>
               <p className=' text-base font-normal text-richblack-200'>
                 A verification code has been sent to you. Enter the code below
               </p>
               <form onSubmit={handlerOnSubmit}>
                 <div className=' flex justify-center'>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span></span>}
                        renderInput={(props) => <input {...props} placeholder='-'
                        
                        className='mx-2 flex justify-center items-center  bg-richblack-700 text-richblack-50
                                text-xl px-4 py-2 box-content rounded-md'/>}
                    />
                 </div>
                 <button type='submit'
                    className=' bg-yellow-100 w-full  rounded-md text-[16px] text-richblack-900 
                                  font-medium p-3 border-b-2 border-b-yellow-50 mt-7 hover:scale-95 
                                 transition-all duration-200 '>
                    Verify Email
                 </button>
               </form>
               <div className=' flex justify-between '>
                 <div>
                 <Link to={"/login"}>
                            <p className=' flex items-center gap-2 text-richblack-50 mt-2 hover:text-richblack-5
                                            transition-all duration-200 '>
                                <HiArrowLongLeft size={25} />
                                Back to login
                            </p>
                        </Link>
                 </div>
                 <button onClick={(e)=>{
                       e.preventDefault();
                       dispatch(sendOtp(signupData.email,navigate))}}
                    className=' flex items-center gap-2 text-blue-200 hover:text-blue-300 transition-all
                                 duration-200'   >
                    <RxCountdownTimer size={20} />
                    Resend OTP
                 </button>
               </div>
            </div>

        )
       }
    </div>
  )
}

export default VerifyEmail