import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './Button'

const LearningLanguageSection = () => {
  return (
    <div>
        <div className=' flex flex-col gap-4 my-[96px] items-center'>

             <div  className=' text-[35px] font-[600] text-center'>
             Your swiss knife for <HighlightText text={"learning any language"}/>
             </div>

             <div className=' text-richblack-600 text-[16px] font-[500] max-w-[700px] text-center'>
             Using spin making learning multiple languages easy. with 20+ languages
              realistic voice-over, progress tracking, custom schedule and more.
             </div>

             <div className=' flex lg:flex-row flex-col items-center justify-center relative'>
               <img
                src={know_your_progress}
                alt='Know_your_progress'
                className=' relative object-contain lg:w-[40%] lg:-mr-36 z-0'
               />
               <img
                src={compare_with_others}
                alt='compare_with_others'
                className=' object-contain relative lg:w-[45%]  z-10'
               />
               <img
                src={plan_your_lessons}
                alt='plan_your_lessons'
                className=' object-contain relative lg:w-[45%]  lg:-ml-36 z-20'
               />
             </div>

             <div>
                <CTAButton active={true} linkto={"/signup"}><p className='font-[600]'>Learn More</p></CTAButton>
             </div>
             
             
        </div>
    </div>
  )
}

export default LearningLanguageSection