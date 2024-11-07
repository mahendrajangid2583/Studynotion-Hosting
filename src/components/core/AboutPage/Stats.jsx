import React from 'react'



const Stats = () => {
    const Stats = [
        {
           count:"5k" , label:"Active Students"
        },
        {
            count:"10+" , label:"Mentors"
         },
         {
            count:"200+" , label:"Courses"
         },
         {
            count:"50+" , label:"Awards"
         },
    ]
   
  return (
    <div className=' flex lg:justify-around justify-between mx-auto max-w-maxContent text-white lg:max-w-maxContent w-11/12
        lg:py-[90px] py-[50px]'>
        {
            Stats.map((element,index)=>(
                <div key={index} className='flex flex-col justify-center items-center gap-3'>
                    <h1 className=' text-3xl text-richblack-25 font-bold'>{element.count}</h1>
                    <p className=' text-base font-semibold text-richblack-300'>{element.label}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Stats