import React from 'react'
import ContactUsForm from './ContactUsForm'

const ContactUs = () => {
  return (
    <div className='flex flex-col gap-2 lg:w-[700px] p-[52px] border border-richblack-500 rounded-xl '>
        <h1 className=' text-4xl font-semibold text-richblack-5'>
          Got a Idea? We’ve got the skills. Let’s team up
        </h1>
        <p className=' text-base font-medium text-richblack-300 mb-6'>
          Tall us more about yourself and what you’re got in mind.
        </p>
        <ContactUsForm/>
    </div>
  )
}

export default ContactUs