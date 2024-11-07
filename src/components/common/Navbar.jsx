import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath, useLocation } from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { IoIosArrowDown } from "react-icons/io";
import { FaHamburger } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RxCross2 } from 'react-icons/rx'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

const Navbar = () => {
    
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=> state.profile);
    const {totalItems} = useSelector((state)=> state.cart);

    const [subLinks, setSubLinks] = useState([]);
    const fatchSubLinks = async()=>{
      try {
        const response = await apiConnector("GET", categories.CATEGORIES_API); 
        console.log("response",response);
        setSubLinks(response.data.allCategory);
      } catch (error) {
        console.log("Could not fatch the categories list",error);
      }
     }
    useEffect( ()=>{
       fatchSubLinks();
    },[])

    const location = useLocation();
    const currentPath = (route)=>{
         return matchPath({path:route},location.pathname);
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (e) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
    };

    const menuRef = useRef(null);
    useOnClickOutside(menuRef,()=>setIsOpen(false));
  return (

    <div className=' relative flex h-14 items-center justify-center border-b-2 border-b-richblack-700'>
      <div className='hidden  lg:flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to={"/"}>
            <img src={Logo} width={160} height={32} loading='lazy'/>
        </Link>
        {/* nav links */}
        <nav>
            <ul className=' flex gap-4 text-richblack-25'>
                {
                    NavbarLinks.map((element,index)=>(
                        <li key={index}>
                           {
                            element.title==="Catalog" ?
                            (<div className='group relative cursor-pointer '>
                              <p className=' flex items-center gap-1'>
                               {element.title} 
                               <IoIosArrowDown/>
                               </p>
                              <div className=' invisible opacity-0 absolute -left-6  top-9 flex flex-col gap-1
                                       bg-richblack-600 group-hover:visible z-50 lg:w-[300px]
                                         group-hover:opacity-100 rounded-md p-4 transition-all duration-200'>
                                <div className=' h-6 w-6 absolute left-20 -top-2
                               bg-richblack-600 rotate-45  rounded-sm z-40'>
                                </div>    
                                {
                                  subLinks.map( (element,index)=>{
                                    return(
                                      <Link to={`/catalog/${element.name.split(" ").join("-")}`} key={index}>
                                      <div className=' text-richblack-25 relative px-3 py-2 rounded-md z-50 
                                      hover:bg-richblack-700 transition-all duration-200 '>
                                        {element.name} 
                                      </div>
                                      </Link>
                                    )
                                  })
                                }
                                
                              </div>
                               
                            </div>):
                            (<Link to={element?.path}  >
                                <p className={`${currentPath(element?.path)? "text-yellow-25":"text-richblack-50"}`}>
                                    {element.title}
                                </p>
                             </Link>)   
                           }
                        
                        </li>
                    ))
                }
            </ul>
        </nav>

        {/* login/ signup/ Dashboard */}
        <div className=' flex gap-x-4 items-center'>
          {
            user && user?.accountType !== "Instructor" &&(
              <Link to="/dashboard/cart" className=' relative text-richblack-100'>
                <IoCartOutline size={28}/>
                {
                  totalItems>0 && (
                    <span className='absolute top-0 left-0 text-sm text-[#ffffff] bg-richblack-800 bg-opacity-90 w-4 h-4 rounded-full border flex justify-center items-center'>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }
          {
            token === null && (
              <Link to={"/login"}>
                <button className='text-base font-medium text-richblack-100 border border-richblack-600 
                py-2 px-3 rounded-md hover:scale-95 transition-all duration-200'>
                  Log in
                </button>
              </Link>
            )
          }
          {
            token === null && (
              <Link to={"/signup"}>
                <button className=' text-base font-medium text-richblack-100 border border-richblack-600
                 py-2 px-3 rounded-md hover:scale-95 transition-all duration-200'>
                  Sign up
                </button>
              </Link>
            )
          }
          {
            token!==null && (<div><ProfileDropDown/></div>)
          }
        </div>
        

      </div>  

      {/* for mobile */}
      <div className=' lg:hidden flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to={"/"}>
            <img src={Logo} width={160} height={32} loading='lazy'/>
        </Link>
    
        

        {/* login/ signup/ Dashboard */}

        <div className=' flex gap-x-1 lg:gap-x-4 items-center'>
           
          {
            user && user?.accountType !== "Instructor" &&(
              <Link to="/dashboard/cart" className=' relative text-richblack-100'>
                <IoCartOutline size={28}/>
                {
                  totalItems>0 && (
                    <span className='absolute top-0 left-0 text-sm text-[#ffffff] bg-richblack-800 bg-opacity-90 w-4 h-4 rounded-full border flex justify-center items-center'>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }
          {
            token === null && (
              <Link to={"/login"}>
                <button className='ml-4 lg:ml-0 text-xs font-normal lg:text-base lg:font-medium text-richblack-100 border border-richblack-600
                py-1 px-1 lg:py-2 lg:px-3 rounded-md hover:scale-95 transition-all duration-200'>
                  Login
                </button>
              </Link>
            )
          }
          {
            token === null && (
              <Link to={"/signup"}>
                <button className='lg:ml-0 text-xs font-normal lg:text-base lg:font-medium text-richblack-100 border border-richblack-600
                py-1 px-1 lg:py-2 lg:px-3 rounded-md hover:scale-95 transition-all duration-200'>
                  Signup
                </button>
              </Link>
            )
          }
          {
            token!==null && (<div><ProfileDropDown/></div>)
          }

          {/* hamburger menu */}
        
          <div className=' relative z-40 flex items-center'
          onClick={(e) => e.stopPropagation()}
          ref={menuRef}>
            <button className={`text-white text-2xl transition-all duration-200 ${isOpen? " bg-richblack-700":""} `}
            onClick={toggleMenu} 
            
            >
              {
                isOpen? <RxCross2/>:<GiHamburgerMenu/>
              }

            </button>
            
            <div className={`${isOpen ? "block":"hidden"} absolute transition-all duration-200 top-0 right-5 w-[150px] bg-richblack-700
              p-4 rounded-md`}
              
              >
            <nav>
              <ul className=' flex-col space-y-4 text-richblack-5'>
                  {
                    NavbarLinks.map((element,index)=>(
                        <li key={index}>
                           {
                            element.title==="Catalog" ?
                            (<div className='group relative cursor-pointer '>
                              <p className=' flex items-center gap-1'>
                               {element.title} 
                               <IoIosArrowDown/>
                               </p>
                              <div className=' invisible opacity-0 absolute -left-6  top-9 flex flex-col gap-1
                                       bg-richblack-600 group-hover:visible z-50 lg:w-[300px]
                                         group-hover:opacity-100 rounded-md p-4 transition-all duration-200'>
                                <div className=' h-6 w-6 absolute left-20 -top-2
                               bg-richblack-600 rotate-45  rounded-sm z-40'>
                                </div>    
                                {
                                  subLinks.map( (element,index)=>{
                                    return(
                                      <Link to={`/catalog/${element.name.split(" ").join("-")}`} key={index}>
                                      <div className=' text-richblack-25 relative px-3 py-2 rounded-md z-50 
                                      hover:bg-richblack-700 transition-all duration-200 '
                                      onClick={()=>setIsOpen(false)}
                                      >
                                        {element.name} 
                                      </div>
                                      </Link>
                                    )
                                  })
                                }
                                
                              </div>
                               
                            </div>):
                            (<Link to={element?.path} onClick={()=>setIsOpen(false)} >
                                <p className={`${currentPath(element?.path)? "text-yellow-25":"text-richblack-5"}`}>
                                    {element.title}
                                </p>
                             </Link>)   
                           }
                        
                        </li>
                    ))
                }
            </ul>
          </nav>
            </div>
          </div>
        </div>
        

      </div>  
    </div>
  )
}

export default Navbar