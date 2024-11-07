import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { FiEdit } from "react-icons/fi";

const MyProfile = () => {

    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
  return (
    <div className=' w-full'>
        <h1 className=' text-3xl font-medium ml-6 text-richblack-5'>My Profile</h1>
      {/* section 1 */}
        <div className=' flex flex-col lg:flex-row lg:items-center justify-between w-11/12 max-w-[792px] bg-richblack-800 rounded-lg
             px-6 py-6 border border-richblack-700 mx-auto mt-14'>
            <div className='flex flex-col lg:flex-row lg:items-center gap-4'>
                <div className=' flex justify-between'>
                    <img src={user?.image} 
                        alt={`profile-${user?.firstName}`}
                        className=' aspect-square w-[78px] rounded-full object-cover'
                    />
                    <IconBtn
                        text={"Edit"}
                        onclick={()=>{
                            navigate("/dashboard/settings")
                        }}
                        customClasses={"lg:hidden flex h-[41px]"}
                    >
                    <FiEdit/>
                    </IconBtn>
                </div>
                <div className=''>
                    <p className=' text-richblack-5 text-lg font-semibold'>{user?.firstName +" "+ user?.lastName}</p>
                    <p className=' text-richblack-200 text-sm font-normal'>{user?.email} </p>
                </div>
            </div>
            
            <IconBtn
                text={"Edit"}
                onclick={()=>{
                    navigate("/dashboard/settings")
                }}
                customClasses={"hidden lg:flex"}
            >
               <FiEdit/>
            </IconBtn>
            
        </div>

        {/* section 2 */}
        <div className=' flex flex-col w-11/12 max-w-[792px] bg-richblack-800 rounded-lg
             px-6 py-6 border border-richblack-700 mx-auto mt-14'>
            <div className='flex justify-between'>
                <p className=' text-richblack-5 text-lg font-semibold'>About</p>
                <IconBtn
                    text={"Edit"}
                    onclick={()=>{
                        navigate("/dashboard/settings")
                    }}
                >
                  <FiEdit/>  
                </IconBtn>
            </div>
            <p className=' text-richblack-200 text-sm font-normal'>
               {user?.additionalDetails?.about ?? "Write Something About Yourself"}
            </p>
        </div>

        {/* section 3 */}
        <div className=' flex flex-col w-11/12 max-w-[792px] bg-richblack-800 rounded-lg
             px-6 py-6 border border-richblack-700 mx-auto mt-14'>
            <div className='flex justify-between'>
                <p className=' text-richblack-25 text-lg font-semibold'>Personal Details</p>
                <IconBtn
                text={"Edit"}
                onclick={()=>{
                    navigate("/dashboard/settings")
                }}
                >
                <FiEdit/>
               </IconBtn>
            </div>
            <div className=' grid grid-cols-1 lg:grid-cols-2 gap-y-5'>
                <div className=' flex flex-col gap-1'>
                    <p className=' text-sm font-normal text-richblack-300'>First Name</p>
                    <p className=' text-sm font-medium text-richblack-25'>{user?.firstName}</p>
                </div>
                <div className=' flex flex-col gap-1'>
                    <p className=' text-sm font-normal text-richblack-300'>Last Name</p>
                    <p className=' text-sm font-medium text-richblack-25'>{user?.lastName}</p>
                </div>
                <div className=' flex flex-col gap-1'>
                    <p className=' text-sm font-normal text-richblack-300'>Email</p>
                    <p className=' text-sm font-medium text-richblack-25'>{user?.email}</p>
                </div>
                <div className=' flex flex-col gap-1'>
                    <p className=' text-sm font-normal text-richblack-300'>Gender</p>
                    <p className=' text-sm font-medium text-richblack-25'>{user?.additionalDetails?.gender ?? "Add Your Gender"}</p>
                </div>
                
                <div className=' flex flex-col gap-1'>
                    <p className=' text-sm font-normal text-richblack-300'>Phone Number</p>
                    <p className=' text-sm font-medium text-richblack-25'>{`${user?.additionalDetails?.countryCode} ${user?.additionalDetails?.contactNumber}` ?? "Add Your Contact Number"}</p>
                </div>
                <div className=' flex flex-col gap-1'>
                    <p className=' text-sm font-normal text-richblack-300'>Date Of Birth</p>
                    <p className=' text-sm font-medium text-richblack-25'>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default MyProfile