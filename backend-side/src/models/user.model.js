import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
        minlength: [6, "Password must be at least 6 characters long!"]
    },
    avatar: {
        type: String,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;