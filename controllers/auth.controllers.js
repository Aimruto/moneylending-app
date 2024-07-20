import generateTokenAndSetCookie from "../config/generateToken.js";
import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";


export const signup = async(req,res)=>{
    const {phoneNumber, email,name, registrationDate,DOB,monthlySalary,password}=req.body;
    //find age by difference bwtwwen dob and curr date
    const age= new Date().getFullYear() -new Date(DOB).getFullYear();

    
    try {
        const curruser=await User.findOne({ email });
        if(curruser){
            return res.status(400).json({message: "Email already exists"});
        }
        if(age<20 || monthlySalary<2500){
            return res.status(400).json({message:"User's age must be atleast 20 years"});
        }
        if(monthlySalary<25000){
            return res.status(400).json({message:"User's monthly salary must be 25k or more"})
        }
        //hash password
        const salt= await bcryptjs.genSalt(10);//adds randomness for more security
        const hashedPassword=await bcryptjs.hash(password,salt);
        // add user to db

        const user =  new User({
            phoneNumber,
            email,
            name,
            DOB,
            monthlySalary,
            password:hashedPassword,
            status: 'approved'
        });
       
        
    if(user){
        
         //Generate JwT token here
        generateTokenAndSetCookie(user,res)
          //save the user
         await user.save();
         //on successfull register
        res.status(201).json({_id:user._id,
            Name:user.name,
            Email:user.email,
            Status:user.status,
            message:"Registration Successfull."});
    }
    else{
        res.status(400).json({ error: "Invalid user data"});
    }
    } catch (error) {
        console.error("signup error:", error);
        res.status(500).json({message: "Server error"});
    }
} 

export const login = async (req,res)=>{
    try {
        const {email,password} =req.body;
        const user = await User.findOne({email});
        const isPasswordCorrect = await bcryptjs.compare(password,user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(500).json({error: "Invalid username or password"});
        }
        generateTokenAndSetCookie(user,res);

        res.status(200).json({
            _id: user._id,
            Name: user.name,
            Email:user.email,
            Salary:user.monthlySalary,
            message:"login sucessful"

        });
    } catch (error) {
        console.error("login error:", error);
        res.status(500).json({message: "Server error"});
    }
}