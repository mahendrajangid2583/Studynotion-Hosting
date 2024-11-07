import React, { useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';
import toast from 'react-hot-toast';


const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({email:'',password:''});
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlerOnChange = (e)=>{
        setFormData((prev)=>( {
            ...prev, [e.target.name]:e.target.value,
        }))
    }

    const {email,password} = formData;
    
    const submitHandler = (e)=>{
        e.preventDefault();
        if(!formData){
            toast.error("please enter email or id");
            return;
        }
        
         dispatch(login(email,password,navigate));
        
    }
   

  return (
    <form  onSubmit={submitHandler}
      className=' flex flex-col gap-5 mt-12'>
        <label>
            <p className='text-sm font-normal text-richblack-50 mb-2'>
                Email Address <span className='text-[#ff0000] text-sm'>*</span>
            </p>
            <input
                required
                type='text'
                value={formData.email}
                name='email'
                placeholder='Enter email address'
                onChange={handlerOnChange}
                className=' p-3 rounded-md bg-richblack-800 w-full text-base text-richblack-50 border-b-2 
                       border-b-richblack-300'
            />
        </label>
        <label className=' relative'>
            <p className=' text-sm font-normal text-richblack-50 mb-2'>
                Password <span className='text-[#ff0000] text-sm'>*</span>
            </p>
            <input
                required
                type={passwordVisible? ("text"): ("password")}
                value={formData.password}
                name='password'
                placeholder='Enter password'
                onChange={handlerOnChange}
                className=' p-3 rounded-md bg-richblack-800 w-full text-base text-richblack-50 border-b-2 
                       border-b-richblack-300'
            />
            <div className='absolute right-3 bottom-4 text-richblack-200 text-xl cursor-pointer'
                onClick={()=>{setPasswordVisible((prev) => !prev)}}>
                {
                    passwordVisible ? <IoMdEye/> : <IoIosEyeOff/>
                }
            </div>
            
        </label>
        <div className=' cursor-pointer relative -mt-1'>
          <div type='click' onClick={ (e)=>{
                            navigate("/forgot-password")}} 
            className=' absolute right-0 text-blue-400  text-xs font-normal text-right'>
              Forgot password
          </div>
        </div>

        <button className=' bg-yellow-100 border-b-2 border-b-yellow-5 py-3 rounded-lg text-base font-medium
                     text-center text-richblack-900 mt-8 hover:bg-yellow-200 hover:scale-95
                      transition-all  duration-200'
            type="submit"
            
            >
            Sign in
        </button>
        
    </form>
  )
}

export default LoginForm