import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { CiLogout } from "react-icons/ci";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { TiArrowSortedDown } from "react-icons/ti";

const ProfileDropDown = () => {

  const [showDropDown, setShowDropDown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const currPath = location.pathname.split("/").at(-1);

   const dispatch = useDispatch();
   const {user} = useSelector((state)=>state.profile) 
   const ref = useRef(null);
   
   useOnClickOutside(ref,()=>setShowDropDown(false));
 

  return (
    <div className='flex flex-col items-center relative'
      onClick={(e) => e.stopPropagation()}
        ref={ref}
      >
      <div className=' flex text-richblack-50 items-center cursor-pointer'
       onClick={()=>setShowDropDown(!showDropDown)}>
        <img className=' relative rounded-full w-8 h-8  group ' src={user.image}
          
        />
        <TiArrowSortedDown size={24}/>
        
      </div>
      
      <div  
        
        className= {`absolute z-10 flex flex-col gap-2  top-10 right-0 w-[200px] bg-richblack-600 px-2 py-2 rounded-lg
                        ${showDropDown ? "visible": "invisible" }`}>
        {/* {
          currPath !== "dashboard" && (
            <Link to={"/dashboard"} onClick={()=>setShowDropDown(false)}>
              <div className='cursor-pointer z-20 text-richblack-25 text-base font-semibold rounded-lg w-full
               hover:bg-richblack-700 py-1 px-3 flex items-center gap-2'>
                <RiDashboardHorizontalLine/>
                Dashboard
              </div>
           </Link>
          )
        }            */}
        
        {
          currPath !== "my-profile" && (
            <Link to={"/dashboard/my-profile"} onClick={()=>setShowDropDown(false)}>
              <div className='cursor-pointer z-20 text-richblack-25 text-base font-semibold rounded-lg w-full
               hover:bg-richblack-700 py-1 px-3 flex items-center gap-2'>
               <CgProfile/>
                My Profile
              </div>
           </Link>
          )
        }  
        <div className=' cursor-pointer z-20 text-richblack-25 text-base font-semibold rounded-lg w-full
         hover:bg-richblack-700 py-1 px-3 flex items-center gap-2'
        onClick={(e)=>{
          setShowDropDown(false);
          dispatch(logout(navigate));
        }}>
          <CiLogout/>
          logout
        </div>
      </div>
    </div>
  )
}

export default ProfileDropDown
