const express = require("express");
const router = express.Router();

const { auth, isInstructor } = require("../middlewares/auth");
const {
    deleteAccount,
    updateProfile,
    updateDisplayPicture,
    getAllUserDetails,
    getEnrolledCourse,
    instructorDashboard,
  } = require("../controllers/Profile");


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile",auth,deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getUserDetails",auth, getAllUserDetails);
router.get("/getEnrolledCourse",auth, getEnrolledCourse);
router.get("/instructorDashboard",auth,instructorDashboard);

module.exports=router;