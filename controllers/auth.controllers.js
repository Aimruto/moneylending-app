import generateTokenAndSetCookie from "../config/generateToken.js";
import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";

// function to handle user registration
export const signup = async(req,res)=>{
    const {phoneNumber, email,name,DOB,monthlySalary,password}=req.body;

    //find age by difference between dob and curr date
    const age= new Date().getFullYear() -new Date(DOB).getFullYear();
    
    try {

        //to check if the email already exists in database
        const curruser=await User.findOne({ email });
        if(curruser){
            return res.status(400).json({message: "Email already exists"});
        }

        //by default;
        let status='pending';

        //user should be above 20 years
        if(age<20){
            status="rejected";
            return res.status(400).json({status:status,message:"User's age must be atleast 20 years"});
        }
        //monthly salary should be 25k or more
        else if(monthlySalary<25000){
            status="rejected";
            return res.status(400).json({status:status,message:"User's monthly salary must be 25k or more"})
        }
        else{
            status="approved";
        }

        //hash password
        const salt= await bcryptjs.genSalt(10);//adds randomness for more security
        const hashedPassword=await bcryptjs.hash(password,salt);

        // new user instance with the current data
        const user =  new User({
            phoneNumber,
            email,
            name,
            DOB,
            monthlySalary,
            password:hashedPassword,
            status: status,
            registrationDate: new Date() //set to current date
        });
       
       
    if(user){
        //save the user
       await user.save(); 
        if(status==="approved"){

            //Generate JwT token here
            generateTokenAndSetCookie(user,res)
        }

         //on successfull register
        res.status(201).json({_id:user._id,
            status:user.status,
            message:"Registration Successfull."});
    }
    else{
        res.status(400).json({ error: "Invalid user data"});
    }
    } catch (error) {
        //handles validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        //handle other errors
        console.error("signup error:", error);
        res.status(500).json({message: "Server error"});
    }
} 

//function to handle user authentication
export const login = async (req,res)=>{
    try {
        const {email,password} =req.body;
        //find user through email
        const user = await User.findOne({email});
        //checks if password is correct
        const isPasswordCorrect = await bcryptjs.compare(password,user?.password || "");
        
        //password is incorrect or user does not exist
        if(!user || !isPasswordCorrect){
            return res.status(500).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user,res);
        //success response
        res.status(200).json({
            _id: user._id,
            message:"login sucessful"

        });
    } catch (error) {
        //error handle
        console.error("login error:", error);
        res.status(500).json({message: "Server error"});
    }
}