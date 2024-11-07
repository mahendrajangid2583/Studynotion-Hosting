import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const timeline = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company"
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority"
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills"
    },
    {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution"
    }
]

const TimelineSection = () => {
  return (
    <div className='max-w-[1200px] w-full my-8'>
        <div className=' flex lg:flex-row flex-col gap-[76px] items-center '>

          <div className=' lg:w-[36%]  flex flex-col lg:gap-2 gap-14 '>
             {
                timeline.map((element, index)=>{
                   return(
                    <div key={index} className=' flex flex-col gap-2'>
                        <div className=' flex flex-row gap-5' >

                            <div className=' w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full'>
                                <img src={element.Logo}
                                    className=' '
                                />
                            </div>

                            <div>
                                <h2 className=' font-semibold text-[18px]'>{element.Heading}</h2>
                                <p className=' text-[14px] font-[400]'>{element.Description}</p>
                            </div>
                        </div>
                        <div className={` hidden ${timeline.length-1 === index ? "hidden": "lg:block"}
                                        h-10 border-dotted  border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}>

                        </div>
                    </div>
                   )
                })
             }
          </div>

          <div className=' relative '>
             <img src={timelineImage} 
                alt='timelineImage'
                className='relative z-20 object-cover'
             />
             <div className=' z-10 absolute left-0 right-0 top-0 bottom-0 bg-white translate-x-5 translate-y-5'>
             </div>
             <div className=' absolute top-[50%] left-[10%] z-0 shadow-[rgba(63,218,230,0.8)_10px_0px_100px_70px] w-[80%] '>
             </div>

             {/* green section */}
             <div className=' w-[68%] absolute z-30 bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-8
                             lg:right-[50%] lg:translate-x-[50%] lg:-translate-y-[50%] right-[3%] -translate-y-[110%]  gap-7 lg:gap-0'>
                 <div className=' flex flex-row gap-5 items-center border-r border-r-caribbeangreen-300 px-10'>
                    <h2 className=' font-bold text-3xl '>10</h2>
                    <p className=' text-caribbeangreen-300 text-sm '>Years of experience</p>
                 </div>
                 <div className=' flex flex-row gap-5 items-center px-10'>
                    <h2 className=' font-bold text-3xl '>250</h2>
                    <p className=' text-caribbeangreen-300 text-sm'>type of courses</p>
                 </div>
             </div>
          </div>

        </div>
    </div>
  )
}

export default TimelineSection