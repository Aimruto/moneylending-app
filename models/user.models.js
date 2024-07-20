import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    phoneNumber:{
        type: String,
        required: true,
    },
    email :{
        type: String,
        required: true,
        unique:true,
    },
    name:{
        type:String,
        required: true,
    },
    registrationDate:{
        type:Date,
        default:Date.now,
    },
    DOB:{
        type:Date,
        required:true,
    },
    monthlySalary:{
        type:Number,
        required:true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    purchasePower: {
        type: Number,
        default: 100000,
    },
    password: {
        type: String,
        required: true,
    },
},{timestamps:true});

const User=mongoose.model("User",userSchema);

export default User;