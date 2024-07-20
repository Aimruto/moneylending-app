import mongoose from "mongoose";

//define the users schema
const userSchema= new mongoose.Schema({
    phoneNumber:{
        type: String,
        required: true,
    },
    email :{
        type: String,
        required: true,
        unique:true,
        match: [/\S+@\S+\.\S+/, 'Email is not valid'], // to check email format is correct or not
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

//create a model using users schema
const User=mongoose.model("User",userSchema);

export default User;