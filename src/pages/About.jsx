import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import FoundingStory from '../assets/Images/FoundingStory.png'
import Stats from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'
import { FaQuoteLeft,FaQuoteRight  } from "react-icons/fa";

const About = () => {
  return (
    <div className=' font-inter'>
        {/* section 1 */}
        <section className=' text-white bg-richblack-800 pt-14'>
            <div className='lg:max-w-maxContent w-11/12 mx-auto '>
                <div className='md:max-w-[913px] mx-auto px-8'>
                    <header className=' text-center text-4xl font-semibold text-richblack-25 '>
                    Driving Innovation in Online Education for a 
                    <HighlightText text={"Brighter Future"}/>
                    </header>
                    <p className=' mt-4  text-base font-medium text-richblack-400 text-center'>
                    Studynotion is at the forefront of drivinginnovation in online education.
                    We're passionate about creating a brighter future by offering cutting-edge 
                    courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </div>
                <div className=' relative flex lg:flex-row flex-col gap-6 justify-center items-center -mt-5 translate-y-[66px]'>
                    <img className=' relative z-20 max-w-[348px] max-h-[311px]' loading='lazy' src={BannerImage1}/>
                    <img className=' relative z-20 max-w-[348px] max-h-[311px]' loading='lazy' src={BannerImage2}/>
                    <img className=' relative z-20 max-w-[348px] max-h-[311px]' loading='lazy' src={BannerImage3}/>
                    <div className=' w-[20%] absolute top-8 shadow-[rgba(168,106,77,0.9)_0px_0px_80px_35px] z-0'></div>
                </div>
            </div>
        </section>
        {/* section 2 */}
        <section className=' border-b border-b-richblack-700 mt-24 py-7'>
            <div className=' text-richblack-50 lg:max-w-maxContent mb-3 leading-[50px] w-11/12 text-center text-4xl font-semibold py-9 mx-auto'>
                <sup className=' inline-block text-richblack-500'><FaQuoteLeft size={20}/></sup>
                {" "}We are passionate about revolutionizing the way we learn. Our innovative platform
                <HighlightText text={" combines technology,"}/>
                <span className=' text-brown-300'> expertise, </span>
                and community to create an 
                <span className=' text-yellow-100'> unparalleled educational experience.</span>
                <sup className=' inline-block text-richblack-500'> <FaQuoteRight size={20}/></sup>
            </div>
        </section>

        {/* section 3 */}
        <section className=' text-white flex flex-col items-center '>
            {/* founding story */}
            <div className=' flex lg:flex-row flex-col gap-10 lg:max-w-maxContent my-[90px] lg:px-16 w-11/12 justify-between items-center'>
               <div className=' lg:w-[42%]'>
                    <h1 className=' text-4xl font-semibold text-[#e63636] font-inter'>Our Founding Story</h1>
                    <p className=' text-base font-medium text-richblack-300 mt-6'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                    <p className=' text-base font-medium text-richblack-300 mt-4'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
               </div>
               <div className=' lg:w-[45%] relative'>
                <img className='relative z-10' loading='lazy' src={FoundingStory}/>
                <div className=' rounded-full absolute top-[24%] left-[20%] w-[20%] shadow-[rgba(134,7,98,0.6)_0px_0px_80px_70px] z-0'></div>
                <div className=' rounded-full absolute top-[40%] left-[13%] w-[20%] shadow-[rgba(134,7,98,0.6)_0px_0px_80px_70px] z-0'></div>
               </div>
            </div>

            {/* vision and mission */}
            <div className=' flex lg:flex-row flex-col gap-10 lg:max-w-maxContent mt-4 mb-[90px] lg:px-16 w-11/12 justify-between items-center'>
                <div className=' lg:w-[42%]'>
                    <h1 className='text-4xl font-semibold text-[#e69136] font-inter'>Our Vision</h1>
                    <p className=' text-base font-medium text-richblack-300 mt-6'>
                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                    </p>
                </div>
                <div className=' lg:w-[45%]'>
                    <h1 className='text-4xl font-semibold text-blue-200 font-inter'>Our Mission</h1>
                    <p className=' text-base font-medium text-richblack-300 mt-6'>
                    our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </p>
                </div>
            </div>
        </section>

        {/* section 4 */}
        <section className=' bg-richblack-800'>
            <Stats/>
        </section>

        {/* section 5 */}
        <section>
            <LearningGrid />
            <ContactFormSection/>
        </section>

        {/* footer section */}
        <Footer/>
    </div>
  )
}

export default About