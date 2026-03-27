import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

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
        default: ""
    }
}, { timestamps: true });

userSchema.pre("save", async function() {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);

})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;