const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async(req,res)=>{
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;

    try {
        //check if the subsection is valid
        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(404).json({
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
                    error:"Video already completed"
                });
            }
            //push into completed video
            courseProgress.completedVideos.push(subSectionId);
        }
        await courseProgress.save();

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            error:"Internal Server Error"
        });
    }
}
