import jwt from "jsonwebtoken"
import { User } from "../Models/User.js";
export const Authenticated = async (req,res,next) => {

    const token = req.header("Auth");

    if(!token) return res.json({message:"Login first"});

    const decoded =  jwt.verify(token,"asdfghjkl");
    // console.log(decoded);
    const id = decoded.userId

    let user = await User.findById(id);

    if(!user){
        return res.status(400).json({success: false, message:"User not exist" });
    }

    req.user = user

    next();// isse jo next router me add to cart function hai run hoga

}