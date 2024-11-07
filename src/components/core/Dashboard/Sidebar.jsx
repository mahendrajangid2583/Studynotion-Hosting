import React, { useState } from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import {logout} from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'
import { FiMenu } from 'react-icons/fi'


const Sidebar = () => {

    const {user, loading: profileLoading} = useSelector((state)=> state.profile);
    const {loading: authLoading} =- useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null)
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if(profileLoading || authLoading){
        return (
            <div className=' mt-10 text-white'>
              Loading...
            </div>
        )
    }
  return (
    <div className='relative z-20'>
        <div
         className=' absolute top-2 left-2 text-lg lg:hidden bg-richblack-600'
         onClick={()=>setIsSidebarOpen(!isSidebarOpen)}
        >
          <FiMenu />
        </div>
        <div className={` absolute top-0 lg:relative flex overflow-hidden 
        ${isSidebarOpen? "w-[220px]":"w-0"} transition-all duration-300
        lg:min-w-[220px] flex-col border-r-[2px] border-r-richblack-700
         h-[calc(100vh-3.5rem)] bg-richblack-800 py-10`}>

              <div
               className=' absolute top-2 left-2 text-lg lg:hidden'
                onClick={()=>setIsSidebarOpen(!isSidebarOpen)}
                >
                <FiMenu />
              </div>

              <div className=' flex flex-col flex-wrap text-richblack-100'>
                  {
                    sidebarLinks.map((link)=>{
                        if(link.type && user?.accountType !== link.type) return null;
                        return(
                            <SidebarLink key={link.id} link={link} iconName={link.icon} setIsSidebarOpen={setIsSidebarOpen}/>
                        )
                    }) 
                  }
              </div>

              <div className=' mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

              <div className=' flex flex-col text-richblack-100'
              onClick={()=>setIsSidebarOpen(false)}
              >
                <SidebarLink
                    link={{name:"Settings",path:"/dashboard/settings"}}
                    iconName={"VscSettingsGear"}
                />

                <button
                    onClick={() =>
                    setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "You will be logged out of your account.",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                    })
                    }
                    className=' text-sm font-medium text-richblack-100'

                    >
                    <div className=' flex items-center gap-x-2 px-8 pt-2'>
                        <VscSignOut className=' text-lg'/>
                        Logout
                    </div>

                </button>
              </div>

        </div>
        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal} />
        }
    </div>
  )
}

export default Sidebar