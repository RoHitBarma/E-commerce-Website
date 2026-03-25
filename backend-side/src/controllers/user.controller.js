import User from "../models/user.model.js";

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

        return res.status(201).json({status: 201, success: true, message: "User created successfully!", data: newUser}) 

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: 500, success: false, message: "Internal server error!"})   
        
    }

}

export {registerUser}