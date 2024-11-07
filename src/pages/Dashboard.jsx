import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {
    
  const {loading: authLoading} = useSelector((state)=>state.auth);
  const {loading: profileLoading} = useSelector((state)=>state.profile);

  if(profileLoading || authLoading){
    return (
      <div className=' text-white mt-36'>
        loading...
      </div>
    )
  }


  return (
    <div className='text-white relative flex min-h-[calc(100vh-3.5rem)] z-0'>
        <Sidebar/>
        <div className=' h-[calc(100vh-3.5rem)]  w-full overflow-auto'>
             <div className='  w-11/12 mx-auto  max-w-[1000px] py-10'>
                 <Outlet/>
             </div>
        </div>
    </div>
  )
}

export default Dashboard