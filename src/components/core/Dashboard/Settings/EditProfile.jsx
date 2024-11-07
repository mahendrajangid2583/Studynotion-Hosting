import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn'
import { updateProfile } from '../../../../services/operations/settingsAPI';
import countryCodes from '../../../../data/countrycode.json'

const EditProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm();

    const submitProfileForm = (data)=>{
        try {
            dispatch(updateProfile(token,data))
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

  return (
    <div className=' mx-auto text-richblack-700'>
       <form onSubmit={handleSubmit(submitProfileForm)}>
          <div className='flex flex-col gap-y-5 bg-richblack-800 rounded-lg p-6 border border-richblack-700'>
            <h1 className=' text-lg text-richblack-5 font-semibold'>
                Profile Information
            </h1>
            <div className=' flex flex-col gap-5 lg:flex-row '>
                <label className="flex flex-col gap-2 lg:w-[50%]">
                    <p className='text-sm text-richblack-200 font-normal'>First Name</p>
                    <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='Enter Your First Name'
                        {...register("firstName",{required:true})}
                        defaultValue={user?.firstName}
                        className=' p-3 rounded-md bg-richblack-700 w-full text-base text-richblack-50 border-b-2 
                       border-b-richblack-500 '
                    />
                    {errors.firstName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter your first name.
                        </span>
                    )}
                </label>
                <label className="flex flex-col gap-2 lg:w-[50%]">
                    <p className='text-sm text-richblack-200 font-normal'>Last Name</p>
                    <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Enter Your First Name'
                        {...register("lastName",{required:true})}
                        defaultValue={user?.lastName}
                        className=' p-3 rounded-md bg-richblack-700 w-full text-base text-richblack-50 border-b-2 
                       border-b-richblack-500 '
                    />
                    {errors.lastName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter your last name.
                        </span>
                    )}
                </label>
            </div>
            <div className=' flex flex-col gap-x-5 lg:flex-row '>
                <label className="flex flex-col gap-2 lg:w-[50%]">
                    <p className='text-sm text-richblack-200 font-normal'>Date Of Birth</p>
                    <input
                        type='date'
                        name='dateOfBirth'
                        id='dateOfBirth'
                        placeholder='Enter Your dateOfBirth '
                        {...register("dateOfBirth",{required:{
                            value: true,
                            message: "Please enter your Date of Birth.",
                            },
                            max:{
                                value: new Date().toISOString().split("T")[0],
                                message:"Date of Birth cannot be in the future."
                            }
                        })}
                        defaultValue={user?.additionalDetails?.dateOfBirth}
                        className=' p-3 rounded-md bg-richblack-700 w-full text-[15px] text-richblack-50 border-b-2 
                       border-b-richblack-500 '
                    />
                    {errors.dateOfBirth && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          {errors.dateOfBirth.message}
                        </span>
                    )}
                </label>
                <label className="flex flex-col gap-2 lg:w-[50%]">
                    <p className='text-sm text-richblack-200 font-normal'>Gender</p>
                    <select
                        type='text'
                        name='gender'
                        id='gender'
                        placeholder='Enter Your Gender '
                        {...register("gender",{required:true})}

                        defaultValue={user?.additionalDetails?.gender}
                        className=' p-3 h-12 rounded-md bg-richblack-700 w-full text-base text-richblack-50 border-b-2 
                       border-b-richblack-500 '
                    >
                    
                      {
                        genders.map((element,index)=>{
                            return <option key={index} value={element}>
                                {element}
                            </option>
                        })
                      }
                    </select>
                    {errors.gender && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                         Please Select your gender.
                        </span>
                    )}
                </label>
            </div>
            <div className=' flex flex-col gap-5'>
                <label htmlFor='contactNumber' className=' -mb-2 text-sm text-richblack-200 font-normal'>Phone Number</label>
                <div className=' flex gap-4'>
                    <select
                        name='countryCode'
                        id='countryCode'
                        {...register("countryCode", {required:true})}
                        placeholder="select country"
                        defaultValue={user?.additionalDetails?.countryCode}
                        className=' p-3 rounded-md bg-richblack-700 w-[130px] text-base text-richblack-50 border-b-2 
                                    border-b-richblack-500'
                        
                    >
                    {
                        countryCodes.map((element,index)=>{
                            return(
                                <option 
                                key={index}
                                value={element.code}>
                                {element.code} - {element.country}

                                </option>
                            )
                        })
                    }
                    </select>
                    
                    
                    <div className='relative w-full'>
                        <input
                            type='tel'
                            name='contactNumber'
                            id='contactNumber'
                            placeholder='Enter your phone number'
                            defaultValue={user?.additionalDetails?.contactNumber}
                            {...register("contactNumber",
                            {
                                required:{value:true,message:"Please enter phone number"},
                                maxLength:{value:10,message:"Invalid Phone Number"},
                                minLength:{value:8,message:"Invalid Phone Number"}
                                })}
                            className=' p-3 rounded-md bg-richblack-700 w-full text-base text-richblack-50 border-b-2 
                                    border-b-richblack-500'
                        />
                        {
                            errors.contactNumber && (
                                <span className='absolute left-0 -bottom-7 text-[12px] text-yellow-100'>
                                    {errors.contactNumber.message}
                                </span>
                            )
                        }
                    </div>
                </div>    

                <label className='flex flex-col gap-2'>
                    <p className='text-sm text-richblack-200 font-normal'>About</p>
                    <input
                        type='text'
                        name='about'
                        id='about'
                        placeholder='Enter about youself'
                        {...register("about",{required:true})}
                        defaultValue={user?.additionalDetails?.about}
                        className=' p-3 rounded-md bg-richblack-700 w-full text-base text-richblack-50 border-b-2 
                       border-b-richblack-500 '
                    />
                    {errors.about && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter about yourself.
                        </span>
                    )}
                </label>
            </div>
            <div className=' flex gap-6 justify-end items-center'>
                <button
                className=' bg-richblack-700 py-[8px] px-4 text-richblack-50 rounded-md'
                 onClick={()=>navigate("/dashboard/my-profile")}>
                    Cencel
                </button>
                <IconBtn text={"Save"} type={"submit"}/>
            </div>
          </div>
       </form>
    </div>
  )
}

export default EditProfile