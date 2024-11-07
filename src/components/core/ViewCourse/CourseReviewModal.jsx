import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import { useParams } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';

const CourseReviewModal = ({setReviewModal}) => {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {courseId} = useParams();

    const {
       register,
       handleSubmit,
       setValue,
       formState:{errors}
    } = useForm();

    useEffect(()=>{
        setValue("courseExperience","");
        setValue("courseRating", 0);
    },[]);

    const ratingChanged = (newRating) => {
        setValue("courseRating",newRating);
      };

    const onSubmit = async(data)=>{
        await createRating(
            {
                courseId:courseId,
                rating:data.courseRating,
                review:data.courseExperience
            },
            token
        );
        setReviewModal(false);
    }  


  return (
    <div
    
    className=' absolute z-50 top-0 bottom-0 right-0 left-0 w-[100vw] h-[100vh] 
     bg-white bg-opacity-10 backdrop-blur-sm transition-all duration-200 flex justify-center items-center'
    >
        <div className=' relative w-[665px] bg-richblack-800 rounded-lg flex flex-col gap-4 overflow-hidden text-white'>
            <div className=' flex justify-between border-b text-richblack-25 bg-richblack-700 border-b-richblack-400 py-4 px-6'>
                <p className=' text-lg font-semibold'>Add Review</p>
                <button
                className=' hover:bg-[#ff0000dd] rounded-sm'
                onClick={()=>setReviewModal(false)}
                >
                    <IoCloseSharp size={24}/>
                </button>
            </div>

            <div className=' flex flex-col gap-y-6 p-8'>
                <div className=' flex gap-x-3 mx-auto'>
                    <img
                        src={user?.image}
                        alt='User Image'
                        className=' aspect-square w-[50px] rounded-full object-cover'
                     />
                     <div className=' flex flex-col text-richblack-25'>
                        <p className=' text-base font-semibold '>{user?.firstName} {user?.lastName}</p>
                        <p className=' text-sm font-normal'>Posting Publicly</p>
                     </div>
                </div>

                <form
                className='flex flex-col'
                onSubmit={handleSubmit(onSubmit)}
                >
                   <div className=' mx-auto'>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        
                    />
                   </div>

                   <div className=' relative flex flex-col w-full'>
                    <label htmlFor='courseExperience' className=' text-sm font-normal text-richblack-50 mb-2'>
                        Add Your Experience <span className=' text-[#ff000d]'>*</span>
                    </label>
                    <textarea
                        id='courseExperience'
                        placeholder='Add your experience here'
                        {...register("courseExperience",{required:true})}
                        className=' form-style min-h-[130px] w-full'
                    />
                    {
                        errors.courseExperience && (
                            <span>
                                Please Add Your Experience
                            </span>
                        )
                    }
                   </div>
                   {/* save and cencel button */}
                   <div className=' w-full flex justify-end mt-6 gap-x-5'>
                        <button
                        onClick={()=>setReviewModal(false)}
                        className='bg-richblack-700 text-richblack-100 border-b-2 border-r-2 border-richblack-400 text-center text-[16px] py-[8px] px-[24px] rounded-[8px] font-[500] 
                          hover:scale-95 transition-all duration-200'
                        >
                            Cencel
                        </button>
                        <IconBtn
                            text="Save"
                            customClasses={"hover:scale-95 transition-all duration-200 border-b-2 border-r-2 border-yellow-5"}
                        />
                   </div>
                </form>
            </div>
        </div>


    </div>
  )
}

export default CourseReviewModal