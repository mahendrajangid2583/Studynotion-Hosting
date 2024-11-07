import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
         <div className={` inline-block text-center text-[16px] py-[12px] px-[24px] rounded-[8px] font-[500]
                         ${active? "bg-yellow-50 text-black border-b-2 border-r-2 border-yellow-5" : 
                         " bg-richblack-800 text-richblack-100 border-b-2 border-r-2 border-richblack-400 "}
                          hover:scale-95 transition-all duration-200`}>
            {children}
         </div>
    </Link>
  )
}

export default Button