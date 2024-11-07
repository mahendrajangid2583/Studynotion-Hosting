const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const uploadImageToCloudinary = require("../utils/imageUploader");
const {convertSecondsToDuration} = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");

// user proFile handler
exports.updateProfile = async (req,res)=>{
    try {
        //fatch data
        const {firstName="", lastName="", gender, dateOfBirth="", about="", contactNumber,countryCode} = req.body;
        // get user Id
        const UserId = req.user.id;
        //validation

        //find Profile
        const userDetails = await User.findById(UserId);
        const ProfileId = userDetails.additionalDetails;
        //update profile in DB
        
        userDetails.firstName = firstName;
        userDetails.lastName= lastName;
        await userDetails.save();
        // method :-1
        // const updatedProfile = await Profile.findByIdAndUpdate({ProfileId},
        //                                                 {
        //                                                     gender:gender,
        //                                                     dateOfBirth: dateOfBirth,
        //                                                     about:about,
        //                                                     contactNumber:contactNumber
        //                                                 },{new:true});
       
        //method:-2
        const profileDetails = await Profile.findById(ProfileId);
        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.countryCode = countryCode;
        profileDetails.contactNumber =contactNumber;
        await profileDetails.save();

        //updated user profile
        const updatedUserDetails = await User.findById(UserId).populate("additionalDetails").exec();

        //return response
        return res.status(200).json({
            success:true,
            message: 'Profile updated successfully',
            updatedUserDetails,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Unable to update Profile, please try again",
            error: error.message
        });
    }
}

//Delete Account handler
// HW: how can we Schedule this deletion operation
exports.deleteAccount = async (req,res) => {
    try {
        //fatch user id
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(401).json({
                success: false,
                message : 'something went wrong, please login again'
            });
        }
        //delete Profile
        const deleteProfile = await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

         //TODO HW: unenroll user from all unrolled courses
         const courses =  userDetails.courses;
         await Promise.all(courses.map(async (courseId) =>{
            await Course.findByIdAndUpdate(
                  courseId,
                {$pull:{studentsEnrolled: id}},
                 {new:true});
         }));

        //  courses.forEach(async (element) =>{
        //      await Course.findByIdAndUpdate({element},{$pull:{studentsEnrolled:id}},{new:true});
        //  });

        // delete user
        const deletedUser = await User.findByIdAndDelete(id);

        //return response
        return res.status(200).json({
            success:true,
            message: 'User Account deleted Successfully',
            deletedUser
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Unable to delete account, please try again",
            error: error.message
        });
    }
}

//get all user details handler
exports.getAllUserDetails = async (req,res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id)
           .populate("additionalDetails")
           .exec();
        console.log("userDetails: ",userDetails);
        res.status(200).json({
            success:true,
            message: "User Data fetched successfully",
            data: userDetails,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Unable to get User Details, please try again",
            error: error.message
        });
    }
}

// update User profile picture 
exports.updateDisplayPicture = async (req,res) => {
    try {
        //fetch id
        const id = req.user.id;
        //fatch picture from files
        const displayPicture = req.files.displayPicture;
        //validation
        if(!displayPicture){
            return res.status(404).json({
                success:false,
                message: 'picture not found'
            });
        }
        //upload profile on cloudinary
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000,
            id
        )
        //update user details
        const updatedProfile = await User.findByIdAndUpdate(
            {_id:id},
            {image: image.secure_url},
            {new: true}
        )
        //return response
        res.status(200).json({
            success:true,
            message: 'image uploaded successfully',
            data: updatedProfile
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Unable to update display picture, please try again",
            error: error.message
        });
    }
}


// Get Enrolled Courses
exports.getEnrolledCourse = async(req,res)=>{
    try {
        //fatch user id
        
        const userId = req.user.id;
        
        //fatch user
        let userDetails = await User.findById(userId).populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection",
                },
            },
        }).exec();

        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[j]
                .subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                
                SubsectionLength +=
                userDetails.courses[i].courseContent[j].subSection.length
            }
            userDetails.courses[i].totalDuration = convertSecondsToDuration(
                totalDurationInSeconds
                )
            let courseProgressCount = await CourseProgress.findOne({
                courseId: userDetails.courses[i]._id,
                userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                Math.round(
                    (courseProgressCount / SubsectionLength) * 100 * multiplier
                ) / multiplier
            }
        }
            
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:`Could not find user with id: ${userId}`
            })
        }

        return res.status(200).json({
            success:true,
            data:userDetails.courses,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};

exports.instructorDashboard = async(req,res) => {
    try {
        const courseDetails = await Course.find({instructor:req.user.id});

        const courseData = courseDetails.map((course)=>{
            const totalStudentEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentEnrolled*course.price

            //create a new object with the additional field
            const courseDataWithStats = {
                _id: course._id,
                courseName : course.courseName,
                courseDescription : course.courseDescription,
                totalStudentEnrolled,
                totalAmountGenerated,
            }
            return courseDataWithStats;
        })

        res.status(200).json({
            success:true,
            courses: courseData,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
