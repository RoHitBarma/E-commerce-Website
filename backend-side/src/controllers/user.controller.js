import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const registerUser = async(req, res) => {
    // we take data from the request body
    // we will check data came or not
    // we will check email is already exist or not
    // if email exist then we will send error message
    // if email not exist then we will create new user and save to database
    // we will send response to client
    try {
        const {name, email, password, avatar} = req.body;
        console.log(`name: ${name}, email: ${email}, password: ${password}, avater: ${avatar}`)

        if(!name || !email || !password) {
            return res.status(400).json({message: "Please enter all fields!"})
        }

        const isUserExist = await User.findOne({email});

        if(isUserExist){
            return res.status(400).json({status: 400, success: false, message: "User already exist!"})
        }

        const newUser = await User.create({
            name,
            email,
            password,
            avatar: " "
        })

        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar
        }

        return res.status(201).json({
            status: 201, 
            success: true, 
            message: "User created successfully!", 
            data: userResponse
        }) 

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500, 
            success: false, 
            message: "Internal server error!"
        })   
        
    }

}

const loginUser = async(req, res) => {
    // we will take data from the request body
    // we will check user email exist or not
    // if email not exist when we will send error message
    // if email exist then we will compare password
    // if password not match then we will send error message
    // if password match then we will send response to client
    // we will generate token and send to client
    // we will save token to database
    // we will set token in cookie
    // we will send response to client

    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({status: 400, success: false, message: "Please enter all fields!"}) 
        }

        const isUserExist = await User.findOne({email});
        if(!isUserExist){
            return res.status(400).json({status: 400, success: false, message: "User not exist!"}) 
        }

        const isPasswordMatch = await isUserExist.comparePassword(password);
        if(!isPasswordMatch){
            return res.status(400).json({status: 400, success: false, message: "Invalid credentials!"})
        }

        const token = jwt.sign(
            {_id: isUserExist._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )

        const userResponse = {
            _id: isUserExist._id,
            name: isUserExist.name,
            email: isUserExist.email,
            avatar: isUserExist.avatar
        }

        return res.status(200).json({
            status: 200, 
            success: true, 
            message: "User logged in successfully!", 
            token: token,
            data: userResponse})

    } catch (error) {
        res.status(500).json({status: 500, success: false, message: "Internal server error!"})
    }
}

export {registerUser, loginUser}