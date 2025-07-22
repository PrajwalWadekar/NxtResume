import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//generating a token
const generateToken= (userId) => {
    return jwt.sign({id:userId}, process.env.JWT_SECRET, {
        expiresIn:'7d'
    })
}

export const registerUser = async(req, res) => {
    try {
        const {name,email,password}=req.body;

        //check if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({success:false, message:"User Already Exists" });
        }
        if(password.length < 8){
            return res.status(400).json({success:false, message:"Password must be atleast 8 characters"});
        }

        //Hashing pw

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //creating user
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error while signing in",
            error:error.message
        })
    }
}

//login fn

export const loginUser= async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(500).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        //compare pw 
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(500).json({success:false, message:"Invalid email or password"})
        }

        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    } catch (error) {
         res.status(500).json({
            success:false,
            message:"Error while logging in",
            error:error.message
        })
    }
}

//Getuser Profile funciton

export const getUserProfile = async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({ success: false, message:"User not found"});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error while fetching profile",
            error:error.message
        })
    }
}