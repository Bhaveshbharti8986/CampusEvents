import jwt from "jsonwebtoken";

import UserModel from "../Model/user.Model.js";
import config from "../config/config.js";
 

// middleware to verify user is login or not 
export const verifyToken= async(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"Token is required"});
        }
        const decoded=jwt.verify(token,config.JWT_SECRET);
        const user=await UserModel.findById(decoded.id);
        if(!user){
            return res.status(401).json({message:"User not found"});
        }
        req.user=user;
        next();
    }
    catch(error){
        return res.status(401).json({message:"Invalid or expired token"});
    }

}


//verify user is admin or not
export const isAdmin=(req,res,next)=>{
    if( req.user && req.user.role=="admin"){
          next();
    }
    else{
        return res.status(403).json({message:"Access denied only admin can access this route"});
    }
}


