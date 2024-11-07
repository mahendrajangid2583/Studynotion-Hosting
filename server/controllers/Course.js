const Course = require("../models/Course");
const Category = require("../models/Category");
const User =require("../models/User");
const imageUploader = require("../utils/imageUploader");
const uploadImageToCloudinary = require("../utils/imageUploader");
require("dotenv").config();
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");


//create course function
exports.createCourse = async (req,res)=>{
    try {
        
        //fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, category, tag,status,instructions} = req.body;
        //get thumbnail
        const thumbnail = req.files.thumbnail;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category ||!thumbnail){
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            });
        }

        if (!status || status === undefined) {
            status = "Draft"
          }

        //check for instructor
        const userId = req.user.id;
        // const instructorDetails = await User.findById({id: userId});
        // console.log("Instrucotor details: ",instructorDetails);

        if(!userId){
            return res.status(404).json({
                success:false,
                message: 'Instructor id not found'
            });
        }

        //check given category is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message: 'category details not found'
            });
        }

        //upload image /thumbnail to cloudinary

        const thumbnailImage = await imageUploader(thumbnail,process.env.FOLDER_NAME);

        //create entry for new Course

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: userId,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category:categoryDetails._id,
            tag,
            instructions,
            thumbnail: thumbnailImage.secure_url,
            status: status
        })

        //add the new course to user schema of instructor
        await User.findByIdAndUpdate(
            {_id: userId},
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {new:true}
        );

         // Add the new course to the Categories

        await Category.findByIdAndUpdate(
            {_id: categoryDetails._id},
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {new:true}
        );

        //return response

        return res.status(200).json({
            success:true,
            data: newCourse,
            message: 'New Course is succesfully Created'
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "something went wrong while creating course",
            error: error.message,
        });
    }
};

// Edit Course Details
exports.editCourse = async (req,res)=>{
    try {
        //fetch course id
        const {courseId} = req.body;
        //fetch details that are to be updated
        const updates = req.body;
        //vaidation
        //find course
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({success:false, error: "Course not found" });
        }

        // If Thumbnail Image is found, update it
        if(req.files && req.files.thumbnail !== undefined){
            console.log("thumbnail updates")
            const thumbnail = req.files.thumbnail;
            //upload to cloudinary
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url;
        }
        //update course
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                course[key] = updates[key]
              
            }
          }
      
        await course.save()
        
        const updatedCourse = await Course.findOne({
        _id: courseId,
        })
        .populate({
            path: "instructor",
            populate: {
            path: "additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
            path: "subSection",
            },
        })
        .exec()  
 //return response
        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
          })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// Get all Courses handler function
exports.showAllCourses = async (req,res)=>{
    try {
        
        const allCourses = await Course.find({}, {courseName:true,
                                                    price:true,
                                                    thumbnail:true,
                                                    instructor:true,
                                                    ratingAndReviews:true,
                                                }).populate("instructor").populate("ratingAndReviews").exec();
        //return response
        res.status(200).json({
            success:true,
            data: allCourses,
            message: "All Course fatched successfully"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message: "Something went wrong while get all courses",
            error: error.message,
        });
    }
}

//get course details
exports.getCourseDetails = async (req,res)=>{
    try {
        //get id
        const {courseId} = req.body;
        //find course details
        const CourseDetails = await Course.findById(
                      {_id: courseId})
                     
                      .populate(
                        {
                            path:"instructor",
                            populate:{
                                path:"additionalDetails",
                            },
                        }
                      )
                      .populate("category")
                      .populate("ratingAndReviews")
                      .populate(
                        {
                            path:"courseContent",
                            populate:{
                                path:"subSection",
                                select: "-videoUrl"

                            }
                        }
                      )
                      .exec();

        //validation
        if(!CourseDetails){
            return res.status(400).json({
                success:false,
                message: `Could not find the course with ${courseId}`,
            });
        } 
        let totalDurationInSeconds = 0
        CourseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
        })
        })  

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
        //return response

        return res.status(200).json({
            success:true,
            message: 'Course details fatched successfully ',
            CourseDetails,
            totalDuration
        })
                      
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get course full details
exports.getFullCourseDetails = async (req,res)=>{
    try {
        //get id
        const {courseId} = req.body;
        //find course details
        const CourseDetails = await Course.findById(
                      {_id: courseId})
                     
                      .populate(
                        {
                            path:"instructor",
                            populate:{
                                path:"additionalDetails",
                            },
                        }
                      )
                      .populate("category")
                      .populate("ratingAndReviews")
                      .populate(
                        {
                            path:"courseContent",
                            populate:{
                                path:"subSection",
                            }
                        }
                      )
                      .exec();

        //validation
        if(!CourseDetails){
            return res.status(400).json({
                success:false,
                message: `Could not find the course with ${courseId}`,
            });
        }   

        let courseProgressCount = await CourseProgress.findOne({
            courseId:courseId,
            userId:req.user.id,
        })

        let totalDurationInSeconds = 0
        CourseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
        })
        })  

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
        
        //return response

        return res.status(200).json({
            success:true,
            message: 'Course details fatched successfully ',
            CourseDetails,
            totalDuration,
            completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        })
                      
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async(req,res)=>{
    try {
        // fatch instructor id from the authenticated user or request body
        const id = req.user.id;
        
        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({instructor:id}).sort({createdAt: -1})
        .populate({
            path:"courseContent",
                populate:{
                    path:"subSection",
                },
        })
        .lean()
        .exec();
       
        
        
        for(var i=0; i<instructorCourses.length; i++){
            let totalDurationInSeconds = 0;
            for( var j=0;j<instructorCourses[i].courseContent.length;j++){
                 totalDurationInSeconds += instructorCourses[i].courseContent[j].
                 subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                 
            }
            instructorCourses[i].totalDuration = convertSecondsToDuration(
                totalDurationInSeconds
            )

            
            
        }
        
        
 // Return the instructor's courses
        res.status(200).json({
        success: true,
        data: instructorCourses,
      })

    } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to retrieve instructor courses",
          error: error.message,
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }

// Course progress

exports.updateCourseProgress = async(req,res)=>{
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;

    try {
        //check if the subsection is valid
        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                error:"Invalid SubSection"
            })
        }
        //check for old entry
        let courseProgress = await CourseProgress.findOne({
            courseId:courseId, userId:userId
        });
        if(!courseProgress){
            return res.status(404).json({success:false, message:"Course progress does not exist"});
        }
        else{
            //check for pre-completing video / subSection
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    success:false,
                    error:"Video already completed"
                });
            }
            //push into completed video
            courseProgress.completedVideos.push(subSectionId);
        }
        await courseProgress.save();

        return res.status(200).json({
            success:true,
            completedVideos: courseProgress?.completedVideos
            ? courseProgress?.completedVideos
            : [],
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            error:"Internal Server Error"
        });
    }
}

