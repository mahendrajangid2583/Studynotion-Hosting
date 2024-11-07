import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import { HiMiniUsers } from "react-icons/hi2";
import { ImTree } from "react-icons/im";

const tagsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tagsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value)=>{
        setCurrentTab(value);
        console.log(value)
        const result = HomePageExplore.filter((course)=> course.tag === value);
        console.log(result)
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
  return (
    <div className=' flex flex-col items-center w-11/12 lg:max-w-[80%]'>
       <div className=' text-3xl font-[600] text-white text-center'>
         Unlock the <HighlightText text={"Power of Code"}/>
       </div>
       <div className='mt-1 text-sm font-[500] text-richblack-400 text-center'>
         Learn to Build Anything You Can Imagine
       </div>

       <div className=' flex flex-row gap-2 bg-richblack-800 px-1 py-1 rounded-full my-5'>
        {
            tagsName.map((element,index)=>{
                return (
                    <div className={`text-[16px] cursor-pointer px-7 py-2 rounded-full
                       ${currentTab === element ? 
                       " bg-richblack-900 text-richblack-5 font-medium " :
                       " text-richblack-200 transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-5"}`}
                       onClick={()=>setMyCard(element)}
                       key={index}>
                        {element}
                    </div>
                )
            })
        }
       </div>

       {/* cards */}

       <div className=' flex lg:flex-row flex-col gap-10 mx-4 justify-between -mt-7 lg:translate-y-[27%] translate-y-[10%]'>
        {
            courses.map((element,index)=>{
                return (
                    <div key={index} className={`w-[360px] lg:w-[30%] h-[300px] flex flex-col justify-between
                        ${currentCard===element.heading? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
                        :"bg-richblack-800"} box-border cursor-pointer`}
                        onClick={()=>setCurrentCard(element.heading)}>
                        <div className='px-[24px] py-[30px] flex flex-col gap-2'>
                            <h1 className= {`text-xl font-semibold 
                                     ${currentCard===element.heading? " text-richblack-900":" text-white"}`} >
                               {element.heading}
                            </h1>
                            <p className=' text-base font-normal text-richblack-500'>{element.description}</p>
                        </div>
                        
                        <div className={` flex flex-row justify-between px-[24px] py-[15px] border-t-2 border-dashed border-t-richblack-500
                          ${currentCard===element.heading?" text-blue-200":" text-richblack-500"} 
                           text-base font-medium`}>
                            <div className=" flex items-center gap-2"><HiMiniUsers/>{element.level}</div>
                            <div className=' flex items-center gap-2'>  
                               <ImTree/>{element.lessionNumber}
                               <p>Lessons</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }
       </div>

    </div>
  )
}

export default ExploreMore