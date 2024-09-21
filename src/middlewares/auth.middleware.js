import  asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const verifyJWT = asyncHandler(async(req,_,next)=>{
    try{
       
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
console.log('token', token)
    if(!token){
        throw new ApiError(401,"Unauthorized request")
    }

  const  decodedToken = Jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

 const user = await User.findById(decodedToken?._id
    ).select("-passwrod -refreshToken")

    if(!user){
        throw new ApiError(401,"Invalid access token")
    }

    req.user = user;
    next()
    }catch(error){
        throw new ApiError(401,error?.message || "Invalid access token")
    }
})