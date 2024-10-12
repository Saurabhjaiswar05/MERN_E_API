import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req,res)=>{
    
    try {
        
        const { name, email, password} = req.body;

        if (!name|| !email || !password){

           return res.json({
                success:false,
                message:"all fields are compulsory"
            })
        }

        // check the user id is already provided
        const exist = await User.findOne({email})
        
        if(exist){
          return  res.status(200).json({
                success:true,
                message:"already registered user"
            });
        }
        // using bcript here for password
        const hashPass = await bcrypt.hash(password,10);



        const user = await new User({
            name,
            email,
            password:hashPass
        });
        await user.save();
        
       return res.status(200).json({
            success:true,
            message:"User Register Successfully...!",
            user
        })
    } catch (error) {
       return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


export const login = async(req,res)=>{
    const {email, password} = req.body
    try {
        // user ka email check karo ki registerd hai ya nahi
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                success:false,
                message:"user not found"
            });
        }
            // password check kro user ka
            const validPassword = await bcrypt.compare(password,user.password);
            if(!validPassword){
                return res.json({
                    success:false,
                    message:"Invalid credentials"
                });
            }

            const token = jwt.sign({userId:user._id},"asdfghjkl",{
                expiresIn:"1y"
            })
            return res.status(200).json({
                success:true,
                token,
                message:`Welcome ${user.name}`
            });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get all users
export const users = async(req,res)=>{
    try {
        const users = await User.find().sort({createdAt:-1});
        return res.status(200).json({
            success:true,
            users
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get profile
export const profile = async (req,res)=>{
    res.json({user:req.user});
}