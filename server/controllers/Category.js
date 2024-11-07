const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

//create tag ka handler fucntion

exports.createCategory = async (req,res) =>{
    try {
        //fatch tagd details from req
        const {name, description} = req.body;
        //vadlidation 
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message: "please fill all the field"
            })
        }
        //create entry in DB
        const categoryDetails = await Category.create({name, description});
        console.log("categoryDetails: ",categoryDetails);

        //return response
        return res.status(200).json({
            success:true,
            message: "Category created successfully"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
};

// get all tags handler
exports.showAllCategories = async (req,res)=>{
    try {
        const allCategory = await Category.find({}, {name:true, description:true});

        return res.status(200).json({
            success:true,
            allCategory,
            message: "All Category are successfully fatched"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        });
    }
};

// category pageDetails 
exports.categoryPageDetails = async (req,res) => {
    try {
        // get categoryId
        const {categoryId} = req.body;
        //get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
                                        .populate({
                                            path: "courses",
                                            match:{ status: "Published"},
                                            populate: "ratingAndReviews",
                                        })
                                        .exec();
        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message: 'data not found'
            });
        }
        //get courses for different categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
          })
          let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
              ._id
          )
          .populate({
            path: "courses",
            match: { status: "Published" },
          })
          .exec();
       // HW: - //get top Selling courses

       const allCategory = await Category.find()
             .populate({
                path:"courses",
                match: {status: "Published"},
                populate:{
                    path: "instructor",
                }
             }).exec();

        const allCourses = allCategory.flatMap((category)=>category.courses);
        const mostSellingCourses = allCourses.sort((a,b)=>b.sold - a.sold).slice(0,10);

        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        });
    }
}