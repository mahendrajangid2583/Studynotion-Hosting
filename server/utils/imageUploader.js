const cloudinary = require('cloudinary').v2;

//image uploader function

const uploadImageToCloudinary = async (file, folder, height, quality,public_id)=>{

    const options = {folder};
    if(height){
        options.height = height;
    }
    if(quality){
        options.quality = quality;
    }
    if(public_id){
        options.public_id = public_id;
        options.invalidate = "true"
    }
    options.resource_type = "auto";

    const response = await cloudinary.uploader.upload(file.tempFilePath, options);

    return response;

};

module.exports = uploadImageToCloudinary;