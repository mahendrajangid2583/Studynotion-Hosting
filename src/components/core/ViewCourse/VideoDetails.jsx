import React, { useEffect, useRef, useState } from 'react'

import "video-react/dist/video-react.css"
import { BigPlayButton, Player } from "video-react"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import IconBtn from '../../common/IconBtn'
import { updateCompletedLectures } from '../../../slices/viewCourseSlice'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI'

const VideoDetails = () => {
  const {courseId, sectionId,subSectionId} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const {token} = useSelector((state)=>state.auth);
  const {courseSectionData, courseEntireData, completedLectures} = useSelector((state)=>state.viewCourse);
  
  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState("")
  
  useEffect(()=>{

    const setVideoSpecificDetails = async() => {
      if(!courseSectionData.length){
      return;
      }
      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-courses");
      }
      else{
        const section = courseSectionData.filter((element)=> element._id === sectionId);
      
        const subSection = section?.[0].subSection.filter((element)=> element._id === subSectionId);
        
        setVideoData(subSection[0]);
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false);
      }

    }
    setVideoSpecificDetails();
    
    
},[courseSectionData, courseEntireData, completedLectures,location.pathname])

  const isFirstVideo = () => {
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
        (data)=> data._id === subSectionId
      );
      if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
        return true;
      }
      else{
        return false;
      }
  }

  const isLastVideo = ()=> {
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection.length;

      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
        (data)=> data._id === subSectionId
      );

      if(currentSectionIndex === courseSectionData.length-1 && currentSubSectionIndex === noOfSubSections-1){
        return true;
      }
      else{
        return false;
      }

  }

  const goToNextVideo = ()=> {
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection.length;

      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
      (data)=> data._id === subSectionId
      );

      if(currentSubSectionIndex !== noOfSubSections-1){
        // next video of the same section because you are not at last index of current subSection
        const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex+1]._id;
        //navigate to this video
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
      }
      else{
        // first video of next section
        const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
        const nextSubSectionId = courseSectionData[currentSectionIndex + 1]?.subSection[0]._id;
        navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
      }
  }

  const goToPrevVideo = ()=> {
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
      (data)=> data._id === subSectionId
      );

      if(currentSubSectionIndex !== 0){
        //same section prev video
        const prevSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex-1]._id;
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
      }
      else{
        const prevSectionId = courseSectionData[currentSectionIndex - 1]?._id;
        const prevSubSectionLength = courseSectionData[currentSectionIndex - 1]?.subSection.length;
        const prevSubSectionId = courseSectionData[currentSectionIndex - 1]?.subSection[prevSubSectionLength - 1]._id;
        navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
      }
  }

  const handleLectureCompletion = async()=> {
    setLoading(true)
    const result = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    if(result){
      dispatch(updateCompletedLectures(result?.completedVideos))
      
    }
    setLoading(false);
  }
  
  
  
  return (
    <div className=' text-white'>
       {
        !videoData ? (
          <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
        ): (
          <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          src = {videoData?.videoUrl}
          onEnded={()=>setVideoEnded(true)}
          >
            <BigPlayButton position='center'/>
            {/* Render When Video Ends */}
            {
              videoEnded && (
                <div 
                 style={{
                  backgroundImage:
                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                 }}
                 className=" absolute inset-0 z-10 grid place-content-center font-inter"
                >
                  {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    text={!loading ? "Mark As Completed" : "Loading..."}
                    customClasses="text-xl max-w-max px-4 mx-auto"
                  />
                  )}
                  <IconBtn
                    disabled={loading}
                    onclick={() => {
                      if (playerRef?.current) {
                        // set the current time of the video to 0
                        playerRef?.current?.seek(0)
                        setVideoEnded(false)
                        playerRef?.current?.play();
                      }
                    }}
                    text="Rewatch"
                    customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                  />
                  <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                    {!isFirstVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToPrevVideo}
                        className="blackButton"
                      >
                        Prev
                      </button>
                    )}
                    {!isLastVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToNextVideo}
                        className="blackButton"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )
            }
          </Player>
        )
       }

       <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
       <p className="pt-2 pb-6">{videoData?.description}</p>
       
    </div>
  )
}

export default VideoDetails