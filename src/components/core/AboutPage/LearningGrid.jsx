import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/Button'

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

const LearningGrid = () => {
  return (
    <div className=' lg:max-w-maxContent w-11/12 grid mx-auto lg:grid-cols-4 grid-cols-1 my-20  
    text-white lg:px-6'>
       {
        LearningGridArray.map((card,index)=>(
           <div key={index}
                className={`${index===0 && " lg:col-span-2 bg-richblack-900 "}
                    ${card.order % 2 ===1? " bg-richblack-700":" bg-richblack-800"}
                    ${card.order ===3 && "lg:col-start-2"}
                    lg:h-[294px] `}>
              {
                card.order <0 ? 
                (
                    <div className=' lg:max-w-[540px] mb-10'>
                        <div className=' text-4xl font-semibold text-richblack-5'>
                            {card.heading}
                            <HighlightText text={card.highlightText}/>
                        </div>
                        <p className=' text-base font-medium text-richblack-300 mt-3 mb-8'>
                            {card.description}
                        </p>
                        <CTAButton linkto={card.BtnLink} active={true}>
                            {card.BtnText}
                        </CTAButton>

                    </div>
                ):
                (
                    <div className=' p-8 flex flex-col gap-8 h-[200px]'>
                        <h1 className=' text-lg font-semibold text-richblack-25'>
                            {card.heading}
                        </h1>
                        <p className=' text-sm font-normal text-richblack-300'>
                            {card.description}
                        </p>
                    </div>
                )
              }      
             
           </div>
        ))
       }
    </div>
  )
}

export default LearningGrid