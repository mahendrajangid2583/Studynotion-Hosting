const express = require("express");
const router = express.Router();

//import controller
const {contactUsController} = require("../controllers/ContactUs");

//Route

router.post("/contact",contactUsController);

module.exports = router;