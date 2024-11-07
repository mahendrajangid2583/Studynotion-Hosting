import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { changePassword } from '../../../../services/operations/settingsAPI';
import IconBtn from '../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {

    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showCurrentPassword,setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState:{errors},
    } = useForm();

    const submitPasswordForm =async(data)=>{
        console.log("password form data", data)
        try {
           await dispatch(changePassword(token,data,reset));
            
        } catch (error) {
            console.log(error.message)
        }
    }

    

  return (
    <div>
       <form onSubmit={handleSubmit(submitPasswordForm)}
       className=' p-6 bg-richblack-800 rounded-lg border border-richblack-700 flex flex-col gap-5'>
          <h1>Password</h1>
          <label className='relative'>
          <p className='text-sm font-normal text-richblack-50 mb-2'>
               Current Password <span className=' text-[#ff0000]'>*</span>
                </p>
            <input
                type={`${showCurrentPassword ? "text":"password"}`}
                name='oldPassword'
                id='oldPassword'
                {...register("oldPassword",{ required:true})}
                placeholder='Enter Your Current Password'

                className=' p-3 rounded-md bg-richblack-700 w-full text-base text-richblack-50 border-b-2 
                        border-b-richblack-500'
            />
            
            <div className='absolute right-3 top-11 text-richblack-200 text-xl cursor-pointer'
                onClick={()=>{setShowCurrentPassword((prev) => !prev)}}>
                {
                    showCurrentPassword ? <IoMdEye/> : <IoIosEyeOff/>
                }
            </div>
            {
                errors.oldPassword && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter current password.
                        </span>
                )
            }
          </label>
          {/* new password field */}
          <label className='relative'>
          <p className='text-sm font-normal text-richblack-50 mb-2'>
               New Password <span className=' text-[#ff0000]'>*</span>
                </p>
            <input
                type={`${showNewPassword ? "text":"password"}`}
                name='newPassword'
                id='newPassword'
                {...register("newPassword",{ required:true})}
                placeholder='Enter Your New Password'

                className=' p-3 rounded-md bg-richblack-700 w-full text-base text-richblack-50 border-b-2 
                        border-b-richblack-500'
            />
            
            <div className='absolute right-3 top-11 text-richblack-200 text-xl cursor-pointer'
                onClick={()=>{setShowNewPassword((prev) => !prev)}}>
                {
                    showNewPassword ? <IoMdEye/> : <IoIosEyeOff/>
                }
            </div>
            {
                errors.newPassword && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter new password.
                        </span>
                )
            }
          </label>
          {/* confirm password */}
          <label className='relative'>
          <p className='text-sm font-normal text-richblack-50 mb-2'>
               Confirm Password <span className=' text-[#ff0000]'>*</span>
                </p>
            <input
                type={`${showConfirmPassword ? "text":"password"}`}
                name='confirmPassword'
                id='confirmPassword'
                {...register("confirmPassword",{ required:true})}
                placeholder='Enter Your Current Password'

                className=' p-3 rounded-md bg-richblack-700 w-full text-base text-richblack-50 border-b-2 
                        border-b-richblack-500'
            />
            
            <div className='absolute right-3 top-11 text-richblack-200 text-xl cursor-pointer'
                onClick={()=>{setShowConfirmPassword((prev) => !prev)}}>
                {
                    showConfirmPassword ? <IoMdEye/> : <IoIosEyeOff/>
                }
            </div>
            {
                errors.confirmPassword && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter current password.
                        </span>
                )
            }
          </label>
          <div className=' flex justify-end gap-4'>
          <button
            onClick={() => {
                navigate("/dashboard/my-profile")
                }}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
                Cancel
          </button>
            <IconBtn
              text={"Update"}
              type={"submit"}
              />
          </div>
       </form>
    </div>
  )
}

export default UpdatePassword