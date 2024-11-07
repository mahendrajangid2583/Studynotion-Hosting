import React, { useEffect, useRef, useState } from 'react'
import IconBtn from '../../../common/IconBtn'
import { useDispatch, useSelector } from 'react-redux'
import { FiUpload } from "react-icons/fi"
import { updateDisplayPicture } from '../../../../services/operations/settingsAPI'


const ChangeProfilePicture = () => {
    const { token } = useSelector((state) => state.auth)
    const {user} = useSelector((state)=>state.profile);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
   
    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click()
    }


    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null)

    const handleFileChange = (e)=>{
        
        const file = e.target.files[0];
        console.log(file)
        if(file){
            setImageFile(file);
            previewFile(file);
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = async()=>{
        setLoading(true);
        try {
            const formData = new FormData()
            formData.append("displayPicture", imageFile)
            console.log("formdata", formData);
            await dispatch(updateDisplayPicture(token,formData))
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
        setLoading(false);

    }

    useEffect(()=>{
        if (imageFile) {
            previewFile(imageFile)
          }
    },[imageFile])
  return (
    <div className=' mx-auto'>
        <div className="flex justify-center lg:justify-start rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 lg:px-12 text-richblack-5">
            
            <div className="flex flex-col lg:flex-row items-center gap-x-4">
                <img src={previewSource || user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[78px] rounded-full object-cover"
                />
                <div className="space-y-2">
                    <p className='hidden lg:block'>Change Profile Picture</p>
                    <div className="flex flex-row gap-3">
                        <input 
                           type='file' 
                           className='hidden'
                           ref={fileInputRef}
                           onChange={handleFileChange} 
                           accept="image/png, image/gif, image/jpeg"
                        />

                        <button
                           disabled={loading}
                           onClick={handleClick}
                           className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                           >
                            Select
                        </button>

                        <IconBtn
                          text={loading ? "Uploading...": "Upload"}
                          onclick={handleFileUpload}
                           >
                            {!loading && (
                              <FiUpload className="text-lg text-richblack-900" />
                            )}
                        </IconBtn>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangeProfilePicture