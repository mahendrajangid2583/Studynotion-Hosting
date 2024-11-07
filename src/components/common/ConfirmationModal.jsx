import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div
     onClick={modalData?.btn2Handler}
     className=' absolute z-50 top-0 bottom-0 right-0 left-0 w-[100vw] h-[100vh] -translate-y-[3.5rem] 
     bg-white bg-opacity-10 backdrop-blur-sm transition-all duration-200'>
         <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white
                 bg-richblack-900 p-7 rounded-lg flex flex-col gap-4'>
            <p className=' text-3xl font-medium text-richblack-5'>
                {modalData?.text1}
            </p>
            <p className=' text-lg font-medium text-richblack-300'>
                {modalData?.text2}
            </p>
            <div className=' flex gap-3'>
                <IconBtn 
                    onclick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                 />

                <button
                 className=" bg-richblack-400 rounded-md text-richblack-900 text-base
                      font-medium py-2 px-5"
                 onClick={modalData?.btn2Handler}>
                     {modalData?.btn2Text}
                </button>  
            </div>
         </div>


    </div>
  )
}

export default ConfirmationModal