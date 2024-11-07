import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import { TiArrowRightThick } from "react-icons/ti";
import CTAButton from './Button'

const InstructorSection = () => {
  return (
    <div>
        <div className=' flex lg:flex-row flex-col gap-[98px] items-center mt-20'>

           <div className=' relative lg:w-[55%]'>
              <div className=' absolute bg-white left-0 right-0 top-0 bottom-0 -translate-x-3 -translate-y-3 z-0'></div>
              <img src={Instructor} className='relative z-10'/>
           </div>

           <div className=' lg:max-w-[460px]'>
                <div className='flex flex-col text-[36px] font-[600]'>
                  <p>Become an</p> <HighlightText text={"instructor"}/>
                </div>
                <div className=' text-richblack-400 mb-12 text-[16px] font-[500]'>
                   Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </div>

                <CTAButton active={true}>
                    <div className=' flex items-center gap-2'>
                       <p className=' text-[16px]'>Start Teaching Today</p>
                       <TiArrowRightThick/>
                    </div>
                </CTAButton>
           </div>

        </div>
    </div>
  )
}

export default InstructorSection