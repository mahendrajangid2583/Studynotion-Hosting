const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


// resetPassword token

exports.resetPasswordToken = async (req,res)=>{
    try {
        //get email from req body
    const {email} = req.body;

    //check user for this email / validation
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(401).json({
            success:false,
            message: "User does not exist "
        })
    }
    //generate token
    const token = crypto.randomUUID();

    // update user by adding token and expiration time 
    const updatedDetails = await User.findOneAndUpdate(
                                               {email:email},
                                               {
                                                token: token,
                                                resetPasswordExpires: Date.now() + 5*60*1000,
                                               },
                                               {new:true});

    //create url
    const url = `http://localhost:3000/update-password/${token}`
    //send mail containing the url
    await mailSender(email,
        "Password reset link",
         `Your Link for email verification is ${url}. Please click this url to reset your password.`);

    // return response
    return res.status(200).json({
        success:true,
        message: "Reset password link is sent on your email, please check email"
    })
    

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "error while sending reset password link",
            error:error.message,
        })
    }
}



//reset Password

exports.resetPassword = async (req,res) =>{
    try {
        //fetch data
        const {password, confirmPassword, token} = req.body;
        //validation
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message: "password not matching",
            });
        }
        //get user details from DB by using token
        const user = await User.findOne({token: token});

        //if no entry  - invalid token
        if(!user){
            return res.json({
                success:false,
                message: "token is invalid"
            });
        }
        //token time check
        if(user.resetPasswordExpires < Date.now()){
            //token is expired
            return res.json({
                success:false,
                message: "Token is expired, please regerate your token"
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //update password
        await User.findOneAndUpdate({token: token},{password: hashedPassword},{new:true});

        //return response
        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Something went wrong while resting the password"
        })
    }
}
