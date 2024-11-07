const Section = require("../models/Section");
const Course = require("../models/Course");

//create section handler function
exports.createSection = async (req,res)=>{
    try {
        //fatch section name 
        const {sectionName, courseId} = req.body;
        //validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }
        //create entry in DB
        const newSection = await Section.create({sectionName});

        //this section detail store in Course wale section array 
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                        {_id:courseId},
                                                        {$push:{courseContent: newSection._id}},
                                                        {new:true})
                                                        .populate({
                                                            path: "courseContent",
                                                            populate: {
                                                                path: "subSection",
                                                            },
                                                        })
                                                        .exec();
        
        //HW: use populate to replace sections/sub-sections both in the updatedCourseDetails

        //return response
        return res.status(200).json({
            success:true,
            updatedCourseDetails,
            message: "Section created successfully"
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Unable to create Section, please try again",
            error: error.message
        })
    }
};


//update section handler
exports.updateSection = async (req,res)=>{
    try {
        //data fatch
        const {sectionName, sectionId, courseId} = req.body;
        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }
        //update data in DB
        const updatedSection = await Section.findByIdAndUpdate(
                                                    {_id:sectionId},
                                                    {sectionName: sectionName},
                                                {new:true});
        
         // updated course
        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();                                   
         
        //return response
        return res.status(200).json({
            success: true,
            message: 'section updated successfully',
            data:updatedCourse
        });                                      

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Unable to update Section, please try again",
            error: error.message
        })
    }
}

//delete Section handler
exports.deleteSection = async (req,res)=>{
    try {
        // fatch section id - 
        //get section id - assuming that we are sending ID in params
        const {sectionId} = req.body;
        const {courseId} = req.body;
        
        //delete section from section DB
        const deleteSection = await Section.findOneAndDelete({_id:sectionId});
        
        //TODO: do we need to delete the entry from the course Schema ??
        //delete section id from courseContent of Course schema 
        const updatedCourse = await Course.findByIdAndUpdate(
                                                        {_id:courseId},
                                                        {$pull:{courseContent: sectionId}},
                                                        {new: true})
                                                        .populate("courseContent")
                                                        .populate("courseContent.subSection").exec();
  
         //return response
        return res.status(200).json({
            success:true,
            message: 'section deleted successfully',
            data:updatedCourse,
            deleteSection
        })                                                

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Unable to Delete Section, please try again",
            error: error.message
        });
    }
}