const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
exports.isLoggedIn = async(req,res,next)=>{
     const token = req.header("Autherization");
    console.log(token , 1)
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Please login to access resource"
        })
    }
    const userId = jwt.verify(token,process.env.JWT_SECRET)
    console.log(userId)
    const user = await User.findById(userId.id)
    console.log(user)
req.user=user
next()
}