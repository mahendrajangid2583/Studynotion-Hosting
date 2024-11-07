const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");

const mailSender = require("../utils/mailSender");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req,res)=>{
    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length===0){
       return res.json({success:false,message: "Please provide Course Id"})
    }

    let totalAmount = 0;

    for(const course_id of courses){
        let course;
        try {
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({success:false, message: "Could not find the course"});
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({success:false, message: "Student is already enrolled"});
            }

            totalAmount+= course.price;

        } catch (error) {
            console.log("Error",error);
            return res.status(500).json({
                success:false,
                message: error.message
            })
        }
    }
    const options = {
        amount: totalAmount*100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString()
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

}

//verify the payment
exports.verifyPayment = async(req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(200).json({success:false,message:"Payement Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

    if (expectedSignature === razorpay_signature) {
        //get enrolled to student
        await enrollStudents(courses, userId, res)
        //return response
        return res.status(200).json({ success: true, message: "Payment Verified" })
    }
    return res.status(200).json({ success: false, message: "Payment Failed" })
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }

const enrollStudents = async(courses, userId, res)=>{
    if (!courses || !userId) {
        return res
          .status(400)
          .json({ success: false, message: "Please Provide Course ID and User ID" })
    }

    for(const courseId of courses){
       try {
         //find course and enrolled the student in it
         const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true}
        )
        if (!enrolledCourse) {
            return res
              .status(500)
              .json({ success: false, error: "Course not found" })
        }

        // create course progress
        const courseProgress = await CourseProgress.create({
            courseId:courseId,
            userId:userId,
            completedVideos :[],
        })

        // find Student and add the course into there enrolled courses field
        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {$push:{
                courses:courseId,
                courseProgress:courseProgress._id,
            }},
            {new:true}
        )
        //mail send 
        const emailResponse = await mailSender(
            enrollStudents.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(
                enrolledCourse.courseName,
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
            )
        )
        console.log("Email sent successfully: ", emailResponse)
       } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
       }
    }
    
}

//capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req,res) => {
//     //get course id and userId
//     const {course_id} = req.body;
//     const userId = req.user.id;
//     //validation
//     //valid CourseId
//     if(!course_id){
//         return res.json({
//             success:false,
//             message:"please provide valid course ID",
//         })
//     }
//     //valid CourseDetails
//     let course;
//     try {
//         course = await Course.findById(course_id);
//         if(!course){
//             return res.json({
//                 success:false,
//                 message:"Could not found the course"
//             });
//         }

//          //User already pay for the same course
//          const uid = new mongoose.Types.ObjectId(userId);
//          if(course.studentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message: 'Student is already enrolled',
//             });
//          }


//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message: error.message,
//         });
//     }
   
//     // create order 
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount:amount * 100,
//         currency,
//         receipt: Math.random(Date.now().toString()),
//         notes:{
//             courseId: course_id,
//             userId,
//         }
//     };

//     try {
//         //initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);
//         //return response
//         return res.status(200).json({
//             success: true,
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message: 'Could not initiate order'
//         })
//     }
//     //return response

// };

// Verify Signature of Razorpay and server

// exports.verifySignature = async (req,res)=>{
//      const webhookSecret = "1234543";

//      const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest){
//         console.log('payment is authorised');

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try {
//             // Fullfil the action

//             // find the course and enroll student in it
//             const enrolledCourse = await Course.findOneAndUpdate(
//                                                            {id: courseId},
//                                                            {$push:{studentsEnrolled: userId}},
//                                                            {new:true}
//                                                         );
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message: 'Course not find'
//                 });
//             } 
            
//             console.log(enrolledCourse);
//             //find the student and add the course into to their list enrolled courses list
//             const enrolledStudent = await User.findOneAndUpdate(
//                                              {id: userId},
//                                              {$push:{courses:courseId}},
//                                              {new:true}
//             );

//             console.log(enrolledStudent);

//             //mail send krdo confirmation wala
//             const emailResponse = await mailSender(
//                                 enrolledStudent.email,
//                                 "Congratulation from codehelp",
//                                 "Congratulation,  You are onboarded into new codehelp course",
//             );

//             console.log(emailResponse);
//             return res.status(200).json({
//                 success:true,
//                 message: 'Signature verified and Course Added'
//             });

            


//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({
//                 success:false,
//                 message: error.message
//             });
//         }


//     }
//     else{
//         return res.status(400).json({
//             success:false,
//             message: 'Invalid request',
//         });
//     }

// };