import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../../services/apiConnector';
import { contactUsEndpoint } from '../../../services/apis';
import toast from 'react-hot-toast';
import countryCodes from '../../../data/countrycode.json'

const ContactUsForm = () => {

    

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessfull}
    } = useForm();

    const submitContactForm = async(data)=>{
        console.log("Contact form data: ",data);
        setLoading(true)
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("POST",contactUsEndpoint.CONTACT_US_API,data)
            console.log("Logging response:", response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            
            toast.success("Email send succefully")
            reset();
        } catch (error) {
            console.log("Error:",error.message);
            toast.error(error.message);
        }
        toast.dismiss(toastId);
        setLoading(false);
       
    }
    
    useEffect(()=>{
        if(isSubmitSuccessfull){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:""
            })
        }
    },[reset, isSubmitSuccessfull])


  return (
    <form  onSubmit={handleSubmit(submitContactForm)}
           className=' flex flex-col gap-4 w-full text-white'>
       <div  className='flex gap-5 w-full'>
        <label className=' w-[50%]'>
            <p className='text-sm font-normal text-richblack-50 mb-2'>
               First Name <span className=' text-[#ff0000]'>*</span>
            </p>
            <input
                type='text'
                name='firstName'
                id='firstName'
                placeholder='Enter first name'
                {...register("firstName",{required:{value:true}})}
                className=' p-3 rounded-md bg-richblack-800 w-full text-base text-richblack-50 border-b-2 
                       border-b-richblack-500 '
            />
            {
                errors.firstName && (
                    <span className='text-caribbeangreen-400 text-sm'>
                        please enter your name
                    </span>
                )
            }
        </label>
        <label className=' w-[50%]'>
            <p className='text-sm font-normal text-richblack-50 mb-2'>
               Last Name <span className=' text-[#ff0000]'></span>
            </p>
            <input
                type='text'
                name='lastName'
                
                placeholder='Enter last name'
                {...register("lastName")}
                className=' p-3 rounded-md bg-richblack-800 w-full text-base text-richblack-50 border-b-2 
                       border-b-richblack-500'
            />
            
        </label>
       </div>
       {/* email */}
       <label>
            <p className='text-sm font-normal text-richblack-50 mb-2'>
               Email Address <span className=' text-[#ff0000]'>*</span>
            </p>
            <input
                type='text'
                name='email'
                placeholder='Enter your email'
                {...register("email",{required:true})}
                className=' p-3 rounded-md bg-richblack-800 w-full text-base text-richblack-50 border-b-2 
                       border-b-richblack-500'
            />
            {
                errors.email && (
                    <span className='text-caribbeangreen-400 text-sm'>Please enter your email adddress</span>
                )
            }
        </label>
        {/* phone number */}
        <div>
            <label>
                <p className='text-sm font-normal text-richblack-50 mb-2'>
                    Phone Number <span className=' text-[#ff0000]'>*</span>
                </p>

                <div className=' flex gap-4 '>
                
                    <select
                        name='countryCode'
                        id='countryCode'
                        {...register("countryCode", {required:true})}
                        placeholder="select country"
                        
                        className=' p-3 rounded-md bg-richblack-800 w-[130px] text-base text-richblack-50 border-b-2 
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
                    
                    
                    <div className=' w-full relative'>
                        <input
                            type='tel'
                            name='phoneNo'
                            placeholder='Enter your phone number'
                            {...register("phoneNo",
                            {
                                required:{value:true,message:"Please enter phone number"},
                                maxLength:{value:10,message:"Invalid Phone Number"},
                                minLength:{value:8,message:"Invalid Phone Number"}
                                })}
                            className=' p-3 rounded-md bg-richblack-800 w-full text-base text-richblack-50 border-b-2 
                                    border-b-richblack-500'
                        />
                        {
                            errors.phoneNo && (
                                <span className='absolute left-0 -bottom-7 text-caribbeangreen-400 text-sm'>
                                    {errors.phoneNo.message}
                                </span>
                            )
                        }
                    </div>
                </div>
            </label>
        </div>
        {/* message */}
        <label>
            <p className='text-sm font-normal text-richblack-50 mb-2'>
               Message <span className=' text-[#ff0000]'>*</span>
            </p>
            <textarea
                type='message'
                name='message'
                cols={30}
                rows={6}
                placeholder='Enter your message here'
                {...register("message",{required:true})}
                className=' p-3 rounded-md bg-richblack-800 w-full text-base text-richblack-50 border-b-2 
                       border-b-richblack-500'
            />
            {
                errors.message && (
                    <span className='text-caribbeangreen-400 text-sm'>
                        Please Enter your message.
                    </span>
                )
            }
        </label>
        <button className=' bg-yellow-100 border-b-2 border-b-yellow-5 py-3 rounded-lg text-base font-medium
                     text-center text-richblack-900 mt-6 hover:bg-yellow-200 w-full
                     hover:scale-95 transition-all duration-200'
            type='submit'>
            Send Message
        </button>
    </form>
  )
}

export default ContactUsForm