import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { resetCourseState } from '../../../slices/courseSlice';

const SidebarLink = ({link, iconName, setIsSidebarOpen}) => {
    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route) =>{
        return matchPath({path:route},location.pathname)
    }
    
    const dispatch = useDispatch();
  return (
    <NavLink 
    to={link.path}
    onClick={link.path === "/dashboard/add-course" ? (()=>dispatch(resetCourseState())):null}
    className={` relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? " bg-yellow-800 text-yellow-50" :
       "bg-opacity-0"}`}
    >
    <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50
       ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>

    </span>
    <div className=' flex items-center gap-x-2 flex-wrap'
    onClick={()=>setIsSidebarOpen(false)}
    >
         <Icon className=" text-lg"/>
         <span>{link.name}</span>
    </div>

    </NavLink>
  )
}

export default SidebarLink