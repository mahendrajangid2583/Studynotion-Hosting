import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFromSection = () => {
  return (
    <div className=' lg:w-[600px] lg:p-[32px] w-11/12 mx-auto mt-5'>
        <div className='flex flex-col gap-3 mb-14'>
          <h1 className=' text-richblack-5 text-4xl font-semibold text-center'>Get in Touch</h1>
          <p className='text-base font-medium text-richblack-300 text-center'>We’d love to here for you, Please fill out this form.</p>
        </div>
        <ContactUsForm/>
    </div>
  )
}

export default ContactFromSection