import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { Link, useNavigate } from 'react-router-dom';
import InstructorChart from './InstructorChart';
import { MdWavingHand } from "react-icons/md";
import IconBtn from '../../../common/IconBtn';
import { VscAdd } from 'react-icons/vsc';

const Instructor = () => {

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const [loading,setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourse] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
         const getCourseDataWithStats = async ()=>{
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            

            if(instructorApiData.length){
                setInstructorData(instructorApiData);
            }
            if(result){
                setCourse(result);
            }
            setLoading(false);
         }
         getCourseDataWithStats();
    },[]);

    const totalAmount = instructorData?.reduce((acc, curr)=> acc + curr.totalAmountGenerated,0);
    const totalStudents = instructorData?.reduce((acc, curr)=> acc + curr.totalStudentEnrolled,0);
    
  return (
    <div className=' flex flex-col gap-y-3'>
      <div>
        <h1 className=' flex items-center gap-2 text-2xl font-bold'>
            Hi {user?.firstName} 
            <div className=' text-yellow-100'><MdWavingHand /></div>
        </h1>
        <p className=' text-base text-richblack-400'>Let's start something new</p>
      </div>

      {loading ? (<div className=' h-[calc(100vh-10rem)] flex justify-center items-center'><div className='spinner mx-auto my-auto'></div></div>)
      :courses?.length > 0 
       ? (<div className=' flex flex-col gap-4'>
            <div>
                <div className=' flex gap-4'>
                    <InstructorChart courses = {instructorData}/>
                    <div className='flex flex-col gap-y-3 text-richblack-50 bg-richblack-800 p-4 rounded-md border border-richblack-700 w-[400px]'>
                        <p className='text-lg font-semibold'>Statistics</p>
                        <div>
                            <p className=' text-base text-richblack-400 font-medium'>Total Courses</p>
                            <p className=' text-2xl font-bold'>{courses.length}</p>
                        </div>

                        <div>
                            <p className=' text-base text-richblack-400 font-medium'>Total Students</p>
                            <p className=' text-2xl font-bold'>{totalStudents}</p>
                        </div>

                        <div>
                            <p className=' text-base text-richblack-400 font-medium'>Total Income</p>
                            <p className=' text-2xl font-bold'>{totalAmount}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className=' bg-richblack-800 rounded-md border border-richblack-700 p-4'>
                <div className=' flex justify-between mb-3'>
                    <p className=' text-lg font-semibold text-richblack-50'>Your Courses</p>
                    <Link to="/dashboard/my-courses">
                        <p className=' text-sm font-medium text-yellow-200'>View All</p>

                    </Link>
                </div>
                <div className=' flex flex-col lg:flex-row lg:gap-3 gap-4 justify-between'>
                    {
                        courses.slice(0,3).map((course)=>(
                            <div className=' lg:w-[32%] flex flex-col gap-y-2'>
                                <img src={course.thumbnail}
                                    className=' w-full object-cover rounded-md h-[200px]'
                                />
                                <div>
                                    <p className=' text-base font-bold text-richblack-200'>{course.courseName}</p>
                                    <div className=' flex items-center gap-2 text-sm text-richblack-400 font-medium'>
                                        <p>{course.studentsEnrolled.length} Students</p>
                                        <p> | </p>
                                        <p>Rs {course.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
       </div>)
       :(<div>
            <p className=' text-lg text-richblack-50 font-semibold'>You have not created any courses yet</p>
            
            <IconBtn
                text="Create a Course"
                onclick={() => navigate("/dashboard/add-course")}
                >
                <VscAdd />
            </IconBtn>
            
       </div>)
      }
    </div>
  )
}

export default Instructor