import React from 'react'
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../../../../services/operations/settingsAPI';
import { useNavigate } from 'react-router-dom';
import { setConfirmationModal } from '../../../../slices/modalSlice';
import { useState } from 'react';
import ConfirmationModal from '../../../common/ConfirmationModal';

const DeleteAccount = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);
    const [confirmationModal,setConfirmationModal] = useState(null);
    

    const clickHandler =()=>{
        dispatch(deleteAccount(token,navigate));
    }
  return (
    <div className=' flex  gap-4 p-6 rounded-lg bg-[#380019] border border-[#691432]'>
        <div className='text-[#EF476F] w-[52px] h-[52px] rounded-full bg-[#691432] flex justify-center items-center'>
            <MdOutlineDeleteForever size={30}/>
        </div>
        <div className=' lg:w-[80%] w-[90%] flex flex-col gap-2'>
            <h1 className=' text-lg font-bold text-richblack-5'>Delete Account</h1>
            <div className=' text-sm font-medium text-[#FBC7D1]'>
                <p className=''>Would you like to delete account?</p>
                <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
            </div>
            <div 
              onClick={()=>{
                setConfirmationModal({
                    text1:"Are You Sure?",
                    text2:"Your account will be deleted permanently.",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: ()=>clickHandler(),
                    btn2Handler: () => setConfirmationModal(null),
                })
              }}
             className='text-[#D43D63] italic text-base font-medium cursor-pointer'>
               I want to delete my account.
            </div>
        </div>

        {/* modal for Account delete confirmation */}
        <div className='absolute top-0 left-0 z-50'>
            {
               confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
            }
        </div>
        
    </div>
  )
}

export default DeleteAccount