import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import PublishCourse from './PublishCourse/PublishCourse';

const RenderSteps = () => {

    const {step} = useSelector((state)=>state.course);
    
    const steps = [
        {
            id:1,
            title: "Course Information",
        },
        {
            id:2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish Course",
        },
    ]

  return (
    <>
        <div className=' flex relative mb-2 justify-center'>
            {steps.map((item,index)=>(
                <>
                    <div key={index} className=''>
                        <div className={` w-[38px] aspect-square rounded-full border flex justify-center items-center
                        ${item.id==step ? 
                        " bg-yellow-900 border-yellow-50 text-yellow-50"
                        : "border-richblack-700 bg-richblack-800 text-richblack-300"}`}
                        >
                        {
                            step>item.id ? (<FaCheck/>) : (item.id)
                            
                        }
                        
                        </div>
                        
                    </div>
                    {item.id !== steps.length && (
                    <>
                        <div key={index}
                        className={`h-[calc(34px/2)] relative w-[33%]  border-dashed border-b-2 ${
                        step > item.id  ? "border-yellow-50" : "border-richblack-500"
                        } `}
                        ></div>
                    </>
                    )}
                </>
            ))}
        </div>
        <div className=' flex mb-16 justify-between '>
            {steps.map((item)=>(
                <div key={item.id}>
                    <div key={item.id} >
                        <p className=''>{item.title}</p>
                    </div>
                </div>
            ))}
        </div>

        {step === 1 && <CourseInformationForm/>}
        {step === 2 && <CourseBuilderForm/>}
        {step === 3 && <PublishCourse/>}
    </>
  )
}

export default RenderSteps

