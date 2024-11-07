const mailSender = require("../utils/mailSender");
const {contactUsEmail} = require("../mail/templates/contactFormRes");


exports.contactUsController = async(req,res)=>{
     //fatch data from body
     const {email, firstName, lastName,message, phoneNo, countryCode} = req.body;
         
     try {
        const response =await mailSender(email,
                                    "Your Data send successfully",
                                    contactUsEmail(email, firstName, lastName,message, phoneNo, countryCode)
                                    );
        console.log("Email Res ", response)   
        return res.status(200).json({
            success:true,
            message:"Email send successfully"
        });                         
     } catch (error) {
        console.log("Error",error);
        console.log("Error message :", error.message)
        return res.status(500).json({
            success:false,
            message:"something went wrong"
        });
     }
}