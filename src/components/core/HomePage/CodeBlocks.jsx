import React from 'react'
import CTAButton from './Button'
import HighlightText from './HighlightText'
import { TiArrowRightThick } from "react-icons/ti";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} relative  flex-col gap-[90px] justify-evenly  w-screen  lg:py-[90px] py-[50px] lg:px-[140px] `}>
       {/* section 1 */}
       <div className=' lg:w-[40%] w-11/12 mx-auto lg:mx-0 flex flex-col gap-[12px]'>
             {heading}
             <div className=' text-richblack-300 text-[16px] font-[500] leading-[24px]'>
                {subheading}
             </div>
             <div className=' flex gap-[24px] mt-6'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-[8px] justify-center items-center  '>
                        {ctabtn1.btntext}
                        <TiArrowRightThick />
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}> 
                        {ctabtn2.btntext}
                </CTAButton>
             </div>
       </div>

       {/* section 2 */}
       <div className=' relative lg:w-[45%] w-11/12 mx-auto lg:mx-0  p-[2px] borderOfCode '>
        
            {/*  gradient */}
            <div className={` top-[30%] left-[20%] absolute w-[80px] h-0 
             ${backgroundGradient} rounded-full `}>

            </div>
           
           <div className=' w-full bg-[#0E1A2D]/[0.24] p-4 flex'>
           
                

                <div className=' text-richblack-300 text-[14px] font-[700]'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className=' flex flex-col text-richblack-50 text-[14px] font-[700]'>
                    <TypeAnimation 
                        sequence={[codeblock,5000,""]}
                        style={{ whiteSpace: 'pre-line', height: '195px', display: 'block' }}
                        repeat={Infinity}
                        cursor={true}
                        omitDeletionAnimation={true}
                        className={`${codeColor}`}
                    />
                </div>
           </div>
       </div>

    </div>
  )
}

export default CodeBlocks 