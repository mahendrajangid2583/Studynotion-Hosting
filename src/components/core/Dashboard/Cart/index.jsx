import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';


export default function Cart() {

    const {total,totalItems} = useSelector((state)=>state.cart);
  return (
    <div>
        <h1 className=' text-3xl font-medium text-[#F1F2FF]'> Your Cart</h1>
        <p className=' text-base font-semibold text-[#6E727F] mt-5 border-b border-b-richblack-600 mb-3'>{totalItems} Courses in Cart</p>
        

        {
            total > 0 ? (
                <div className=' flex flex-col-reverse lg:flex-row items-start gap-x-10 gap-y-6'>
                <RenderCartCourses/>
                <RenderTotalAmount/>
                </div>
            ):(<p className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is empty
        </p>)
        }
    </div>
  )
}
