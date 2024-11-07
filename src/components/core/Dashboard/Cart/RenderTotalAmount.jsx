import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {
  const {total,cart} = useSelector((state)=>state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.profile);
  const {token} = useSelector((state)=>state.auth);

  

  const handleBuyCourse= async()=>{
     let courses=[];
      cart.forEach(course => {
        
        courses.push(course._id);
      });
     
      // const courses =await cart.map((course)=>course.id);
      // console.log("Bought these courses:",courses);
      // console.log("Bought these courses:",cart)
      // //TODO : API payment intigration
      
      buyCourse(token,courses,user,navigate,dispatch);
  }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}

export default RenderTotalAmount