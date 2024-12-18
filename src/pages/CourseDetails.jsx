import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { useState } from 'react';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Loader from '../components/common/Loader';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import Error from './Error';
import { formatDate } from '../services/formatDate';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import { BiInfoCircle } from 'react-icons/bi';
import { HiOutlineGlobeAlt } from 'react-icons/hi2';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';
import Footer from '../components/common/Footer';
import Markdown from 'react-markdown';
import { ACCOUNT_TYPE } from '../utils/constants';
import toast from 'react-hot-toast';
import { addToCart } from '../slices/cartSlice';


const CourseDetails = () => {

    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)
    const {user} = useSelector((state)=>state.profile);
    const {courseId} = useParams();

    const [courseData, setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    useEffect(()=>{
        const getCourseFullDetails = async()=>{
            try{
                const result = await fetchCourseDetails(courseId);
                setCourseData(result);
            }
            catch(error){
               console.error("Could not fatch Course Details")
            }
        }
        getCourseFullDetails();
    },[courseId])

    const [avgReviewCount, setAvgReviewCount] = useState();

    useEffect(()=>{
        const count = GetAvgRating(courseData?.data?.CourseDetails?.ratingAndReviews)
        setAvgReviewCount(count);
    },[courseData])

    const [totalNoOfLectures,setTotalNoOfLectures] = useState(0);
    useEffect(()=>{
        let lecture = 0;
        courseData?.data?.CourseDetails?.courseContent?.forEach(element => {
            lecture+=element?.subSection.length || 0
        });
        setTotalNoOfLectures(lecture);
    },[courseData])

    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id)=>{
        setIsActive(
            !isActive.includes(id)
            ? isActive.concat(id)
            : isActive.filter((e)=> e!==id)
        )
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    const handleBuyCourse = () => {
        if (token) {
          buyCourse(token, [courseId], user, navigate, dispatch)
          return
        }

        scrollToTop();
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Course.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
          })
          
    }  

    const handleAddToCart = ()=>{
      if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
          toast.error("You are an Instructor, You can't buy a course");
          return;
      }
      if(token){
          dispatch(addToCart(courseData?.data?.CourseDetails));
          return
      }
      scrollToTop();
      setConfirmationModal({
          text1:"You are not logged in",
          text2:"Please login to add course in cart",
          btn1Text:"Login",
          btn2Text:"Cencel",
          btn1Handler:()=>navigate("/login"),
          btn2Handler:()=>setConfirmationModal(null),
      })
      
  }
    
    if(loading || !courseData){
        return (
            <div><Loader/></div>
        )
    }

    if(!courseData?.data?.success){
        return (
            <div><Error/></div>
        )
    }

    const {
        _id:course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,

    } = courseData?.data?.CourseDetails;
    
  return (
    // <div className=' flex flex-col w-full  text-white'>
        
    //     <div className='relative flex flex-col justify-start lg:w-[1260px] mx-auto'>
    //         <p>{courseName}</p>
    //         <p>{courseDescription}</p>
    //         <div>
    //             <span>{`${avgReviewCount}`}</span>
    //             <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
    //             <span>{ratingAndReviews.length} reviews</span>
    //             <span>{studentsEnrolled.length} student enrolled</span>
    //         </div>
    //         <div>
    //             <p>Created By {instructor.firstName} {instructor.lastName}</p>
    //         </div>

    //         <div className=' flex gap-x-3'>
    //             <p>Created At {formatDate(createdAt)}</p>
    //             <p>{" "} English</p>
    //         </div>

    //         <div>
    //             <CourseDetailsCard
    //                 course = {courseData?.data?.CourseDetails}
    //                 setConfirmationModal = {setConfirmationModal}
    //                 handleBuyCourse = {handleBuyCourse}
    //             />
    //         </div>
    //     </div>

    //      <div>
    //         <p>What You Will Learn</p>
    //         <div>
    //             {whatWillYouLearn}
    //         </div>
    //      </div>

    //      <div>
    //         <div>
    //             <p>Course Content:</p>
    //         </div>

    //         <div>
    //             <div>
    //                 <span>{courseContent.length} Sections</span>

    //                 <span>
    //                 {totalNoOfLectures} Lectures
    //                 </span>
    //             </div>

    //             <div>
    //                 <button
    //                    onClick={()=>setIsActive([])}
    //                 >
    //                     Collapes all sections
    //                 </button>
    //             </div>

    //         </div>
    //      </div>

    //     {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    // </div>
    <div className='relative'>
      <div className={`relative w-full bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`text-richblack-200`}>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{`${avgReviewCount}`}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
             <button className="yellowButton"
                onClick={
                user && courseData?.data?.CourseDetails?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
                }>
                  {user && courseData?.data?.CourseDetails?.studentsEnrolled.includes(user?._id)
                  ? "Go To Course"
                  : "Buy Now"}
              </button>
              {/* <button className="blackButton" onClick={handleAddToCart}>Add to Cart</button> */}
              {(!user || !courseData?.data?.CourseDetails?.studentsEnrolled.includes(user?._id)) && (
                <button onClick={handleAddToCart} className="blackButton">
                  Add to Cart
                </button>
              )}
            </div>
          </div>
          {/* Courses Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={courseData?.data?.CourseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <Markdown>{whatYouWillLearn}</Markdown>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent.length} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>{courseData.data?.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div className=''>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </div>
    </div>
  )
}

export default CourseDetails
