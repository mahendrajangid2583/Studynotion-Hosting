const express = require("express");
const router = express.Router();

//import the controllers

// Course Controllers Import
const {
    createCourse, 
    showAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    getInstructorCourses,
    deleteCourse,
    editCourse
   } = require("../controllers/Course");

// category controller import
const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
  } = require("../controllers/Category");
  
  // Sections Controllers Import
const {
    createSection,
    updateSection,
    deleteSection,
  } = require("../controllers/Section")

  // Sub-Sections Controllers Import
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
  } = require("../controllers/Subsection")

  // Rating Controllers Import
const {
    createRating,
    getAverageRating,
    getAllRating,
  } = require("../controllers/RatingAndReview")

  // const {
  //   updateCourseProgress
  // } = require("../controllers/courseProgress");
  const {
    updateCourseProgress
  } = require("../controllers/Course");

  // Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

//course can only be created by instructor
router.post("/createCourse", auth, isInstructor, createCourse);
//update course
router.post("/editCourse",auth, isInstructor, editCourse);
//delete course
router.delete("/deleteCourse",auth, isInstructor,deleteCourse);
//Add a Section to a Course
router.post("/addSection",auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
//get all instructor courses
router.get("/getInstructorCourses",auth, isInstructor, getInstructorCourses);

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router
