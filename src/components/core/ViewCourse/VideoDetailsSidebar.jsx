import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { FiMenu } from 'react-icons/fi';

const VideoDetailsSidebar = ({setReviewModal}) => {

  const [activeStatus,setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {sectionId, subSectionId} = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures
  } = useSelector((state)=>state.viewCourse);

  useEffect(()=>{
    // not need to call function when we create function like this
     ;(()=>{
         if(!courseSectionData.length)
          return;
         const currentSectionIndex = courseSectionData.findIndex(
          (data)=> data._id === sectionId
         )
         const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
           (data)=> data._id === subSectionId
         )
         const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
         // set current section is here 
         setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
         // set current sub-Secton is here
         setVideoBarActive(activeSubSectionId);
     })()
  },[courseSectionData, courseEntireData, location.pathname]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className='relative z-20'>
      <div
         className='absolute text-white top-2 left-2 text-xl lg:hidden'
         onClick={()=>setIsSidebarOpen(!isSidebarOpen)}
        >
          <FiMenu />
      </div>
      <div className={` absolute top-0 lg:relative
      ${isSidebarOpen ? "w-[320px]":"w-0"} transition-all duration-200 overflow-hidden
      flex flex-col h-[calc(100vh-3.5rem)] lg:w-[320px]  border-r-[1px] border-r-richblack-700 bg-richblack-800`}>
         
        {/* hamburger menu for mobile view */}
        <div
            className=' text-white absolute top-2 left-2 text-xl lg:hidden'
            onClick={()=>setIsSidebarOpen(!isSidebarOpen)}
            >
            <FiMenu />
        </div>
        {/* for buttons and heading */}
        <div className=' flex flex-col mx-5 mt-4 items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25'>
          {/* for buttons  */}
          <div className='flex w-full items-center justify-between '>
             <div
               className='flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-95 transition-all duration-200'
                title="back"
               onClick={()=>navigate("/dashboard/enrolled-courses")}
             >
                <IoIosArrowBack size={30} />
             </div>
             <div>
              <IconBtn 
                  text="Add Review"
                  customClasses="ml-auto"
                  onclick={()=>setReviewModal(true)}
              />
             </div>
          </div>
          {/* for heading */}
          <div className="flex flex-col">
              <p>{courseEntireData?.courseName}</p>
              <p className="text-sm font-semibold text-richblack-500">
                {completedLectures?.length} / {totalNoOfLectures}
              </p>
          </div>
        </div>

        {/* for section and subSectons */}
        <div className='"h-[calc(100vh - 5rem)] overflow-y-auto'>
          {
            courseSectionData.map((section, index) => (
              <div
                className="mt-2 cursor-pointer text-sm text-richblack-5"
                onClick={()=>setActiveStatus(section?._id)}
                key={index}
              >
                 {/* section */}
                 <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                   <div className="w-[70%] font-semibold">
                    {section?.sectionName}
                   </div>
                   {/* add icon ans rotate 180 on click */}
                   <div className="flex items-center gap-3">
                  <span className="text-[12px] font-medium">
                    Lessions {section?.subSection.length}
                  </span>
                  <span
                    className={`${
                      activeStatus === section?._id
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
                 </div>

                 {/* sub Sections  */}
                 <div >
                    {
                        activeStatus === section?._id && (
                          <div className="transition-[height] duration-500 ease-in-out">
                            {
                              section.subSection.map((topic,index)=>(
                                <div
                                 className={`flex gap-3  px-5 py-2 ${
                                  videoBarActive === topic._id
                                    ? "bg-yellow-200 font-semibold text-richblack-800"
                                    : "hover:bg-richblack-900"
                                  } `}
                                 key={index}
                                 onClick={()=>{
                                  
                                  navigate(
                                    `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                                  )
                                  setVideoBarActive(topic?._id);
                                  setIsSidebarOpen(false);
                                 }
                                 }
                                >
                                  <input
                                    type='checkbox'
                                    checked = {completedLectures.includes(topic?._id)}
                                    onChange={()=>{}}
                                  />
                                  <span>
                                    {topic.title}
                                  </span>
                                </div>
                              ))
                            }
                          </div>
                        )
                    }
                 </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default VideoDetailsSidebar