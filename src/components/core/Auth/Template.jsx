import React from 'react'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import backGroundImage from '../../../assets/Images/frame.png'

const Template = ({heading, description1, description2, image, formType}) => {
  return (
    <div className=' max-w-maxContent w-11/12 flex flex-col lg:flex-row justify-between mx-auto mt-4 lg:mt-14'>
        <div className=' lg:w-[40%] p-[32px] flex flex-col'>
            <h1 className=' text-richblack-5 text-3xl font-semibold'>{heading}</h1>
            <p className=' mt-3'>
                <span className=' text-richblack-300 text-lg font-normal'>{description1}</span>
                <span className=' text-base font-bold text-blue-200 italic font-edu-sa'>{description2}</span>
            </p>
            
            {
                formType==="login"? (<LoginForm/>):(<SignupForm/>)
            }

        </div>
        <div className='hidden lg:block relative lg:w-[47%]'>
            <img className=' absolute z-0 top-4 left-4' loading='lazy' src={backGroundImage}/>
            <img className=' relative z-10' loading='lazy' src={image}/>
        </div>
    </div>
  )
}

export default Template;