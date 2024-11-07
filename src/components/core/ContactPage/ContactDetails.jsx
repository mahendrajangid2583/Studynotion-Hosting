import React from 'react'
import { IoLogoWechat } from "react-icons/io5";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { PiPhoneCallFill } from "react-icons/pi";

const ContactDetails = () => {

    const contactDetails = [
        {
          icon: <IoLogoWechat/>,
          heading: "Chat on us",
          description: "Our friendly team is here to help.",
          details: "info@studynotion.com",
        },
        {
          icon: <BsGlobeEuropeAfrica/>,
          heading: "Visit us",
          description: "Come and say hello at our office HQ.",
          details:
            "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
        },
        {
          icon: <PiPhoneCallFill/>,
          heading: "Call us",
          description: "Mon - Fri From 8am to 5pm",
          details: "+123 456 7869",
        },
      ]
  return (
    <div className='flex flex-col gap-9 rounded-xl bg-richblack-800 lg:max-w-[450px] p-8'>
        {
            contactDetails.map((element,index)=>{
                return(
                    <div key={index} className=' flex gap-2'>
                        <div className=' text-richblack-200 mt-1 text-xl'>{element.icon}</div>
                        <div className=' flex flex-col gap-1'>
                            <h1 className=' text-lg font-semibold text-richblack-25'>
                              {element.heading}
                            </h1>
                            <p className=' text-sm font-semibold text-richblack-200'>
                              {element.description}
                            </p>
                            <p className=' text-sm font-semibold text-richblack-200'>
                              {element.details}
                            </p>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ContactDetails