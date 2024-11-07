import React from 'react'
import { Link } from 'react-router-dom'
import { TiArrowRightThick } from "react-icons/ti";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import { TypeAnimation } from 'react-type-animation';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';


function Home() {
  return (
    <div>
       {/* Section 1 */}
        <div className=' relative mx-auto flex flex-col items-center '>
            <div className=' relative mx-auto flex flex-col items-center h-auto justify-between text-white 
                        max-w-[913px] lg:h-[276px] w-11/12 mt-14'>
                <Link to={"/signup"} >
                    <div className='group py-[6px] px-[18px] border-b border-richblack-600 rounded-[100px]
                     bg-richblack-800 transition-all duration-200 hover:scale-95 inline-block'>
                        <div className=' flex flex-row justify-center items-center text-[16px]
                         font-[500] text-richblack-200 gap-[10px] transition-all duration-200 
                         '>
                            <p>Become an instructor </p>
                            <TiArrowRightThick />
                        </div>
                    </div>
                </Link>
                <div className=' text-[36px] font-[600] text-white text-center'>
                   Empower Your Future with 
                   <HighlightText text= {"Coding Skills"}/>
                </div>
                <div className=' text-richblack-200 text-[16px] font-[500] leading-[24px] text-center'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources,
                 including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>
                <div className=' flex gap-[24px]'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>
            </div>
            {/* video div */}
            <div className=' shadow-blue-100 w-[1035px] mx-auto max-w-[80%] h-auto mt-12 relative'>
              <div className=' w-[30%] h-[50%] rounded-full absolute z-0 left-[50%] -translate-x-[50%] dropShadow translate-y-8'></div>
              <div className=' w-[30%] h-[50%] rounded-full z-0 bg-white dropShadow absolute left-5 top-[50%] -translate-y-[50%] '></div>
              <div className=' bg-white  w-full h-full absolute z-0 translate-x-4 translate-y-4'></div>
              <video 
                  className=' w-full relative  z-10' 
                  muted 
                  autoPlay 
                  loop>
                     <source src={Banner}/>
              </video>
            </div>
          {/* code section 1 */}
            <div>
                <CodeBlocks
                  position={"lg:flex-row"}
                  heading={
                    <div className=' text-white text-[32px] font-[600]'>
                      Unlock your <HighlightText text={"coding potential"} /> with our online courses.
                    </div>
                  }
                  subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                  ctabtn1={
                    {
                      btntext: "Try is yourself",
                      linkto : "/signup",
                      active: true
                    }
                  }
                  ctabtn2={
                    {
                      btntext: "learn more",
                      linkto : "/login",
                      active: false
                    }
                  }
                  codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                  backgroundGradient={"shadow-[rgba(168,106,77,0.3)_10px_0px_100px_110px]"}
                  codeColor={""}           
                />
                
            </div>
            {/* code section 2 */}
            <div>
                <CodeBlocks
                  position={"lg:flex-row-reverse"}
                  heading={
                    <div className=' text-white text-[32px] font-[600]'>
                      <div>Start <HighlightText  text={`coding` } /> </div>
                      <div><HighlightText  text={`in seconds` } /></div>
                    </div>
                  }
                  subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                  ctabtn1={
                    {
                      btntext: "Try is yourself",
                      linkto : "/signup",
                      active: true
                    }
                  }
                  ctabtn2={
                    {
                      btntext: "learn more",
                      linkto : "/login",
                      active: false
                    }
                  }
                  codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                  backgroundGradient={"shadow-[rgba(38,132,182,0.3)_10px_0px_100px_100px]"}
                  codeColor={"text-yellow-25"}           
                />
                
            </div>

            <ExploreMore />
    
        </div>

       {/* Section 2 */}
       <div className=' w-screen bg-pure-greys-5 text-richblack-700'>
          <div className='homepage_bg h-[320px] flex items-center'>
             <div className=' w-11/12 max-w-maxContent flex items-center justify-center gap-5 mx-auto'>
                
                <div className=' flex flex-row  gap-7 text-white mx-auto'>
                  <CTAButton active={true} linkto={"/signup"}>
                    <div className=' flex items-center gap-2'>
                      Explore Full Catalog   <TiArrowRightThick/>
                    </div>
                    
                  </CTAButton>
                  <CTAButton active={false} linkto={"/signup"}>
                    Learn more
                  </CTAButton>
                </div>

             </div>
               
          </div>

          <div className=' w-11/12 max-w-maxContent mx-auto flex flex-col items-center  gap-5 mt-[90px]'>
            <div className=' max-w-[1200px] flex lg:flex-row flex-col gap-[25px]'>
                  <div className=' text-4xl font-semibold'>
                    Get the skills you need for a <HighlightText text={"job that is in demand"}/> 
                  </div>
                  <div className=' '>
                    <p className=' text-[16px] font-[500] mb-9'>The modern StudyNotion is the dictates its own terms.
                     Today, to be a competitive specialist requires more than professional skills.
                    </p>
                    <CTAButton active={true} linkto={"/signup"}>Learn more</CTAButton>
                    
                  </div>
                  
            </div>
            <TimelineSection/>

            <LearningLanguageSection/> 
          </div>

       </div>


       {/* Section 3 */}
       <div className=' w-11/12 mb-20 mx-auto max-w-maxContent flex flex-col items-center gap-8 bg-richblack-900 text-white'>
          <InstructorSection/>

          <h2 className=' text-center text-4xl font-semibold mt-10'> Review from Other Learners</h2>
          <ReviewSlider/>
          
       </div>

       {/* Footer */}
       <div className='  w-screen bg-richblack-800'>

          <Footer/>

       </div>
    </div>
  )
}

export default Home