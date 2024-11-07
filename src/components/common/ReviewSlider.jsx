import React, { useEffect, useState } from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Navigation, Pagination}  from 'swiper/modules'
import { apiConnector } from '../../services/apiConnector'
import { ratingsEndpoints } from '../../services/apis'

import ReactStars from "react-rating-stars-component";



const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(()=>{
       const fetchAllReviews = async()=>{
        const response = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
        console.log("logging review data",response);

        if(response?.data?.success){
            setReviews(response?.data?.data);
        }
        console.log("Reviews",reviews);
       }

       fetchAllReviews();
    },[])
  return (
    <div className=' text-white'>
       <div className=' h-[190px] max-w-maxContent'>
        <Swiper
        slidesPerView={4}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        autoplay={
            {delay:2500}
        }
        modules={[Autoplay,FreeMode,Pagination]}
        className='w-full'
        >
            {
                reviews.map((review,index)=>(
                    <SwiperSlide key={index} >
                         <div className='h-[185px] bg-richblack-800 p-3 space-y-2'>
                            <div className=' flex gap-[12px]'>
                                <img 
                                src={review?.user?.image} 
                                alt='User Image'
                                className=' w-9 h-9 rounded-full'
                                />
                                <div>
                                    <h1 className=' text-[14px] text-richblack-25 font-semibold'>{review?.user?.firstName} {review?.user?.lastName}</h1>
                                    <p className=' text-xs text-richblack-500 font-medium'>{review?.user?.email}</p>
                                </div>
                            </div>
                            <div className=' text-xs font-medium text-richblack-50'>
                                {review?.review}
                            </div>
                            <div className='flex gap-2 text-base items-center relative'>
                                <div className='  mt-[3px] text-yellow-100'>
                                    {review?.rating}
                                </div>
                                <ReactStars 
                                    count={5}
                                    value={review?.rating}
                                    size={24}
                                    edit={false}
                                />
                            </div>
                         </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
       </div>

    </div>
  )
}

export default ReviewSlider