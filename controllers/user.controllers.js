import User from "../models/user.models.js";
//function to retrieve user data 
export const UserData = async (req,res) =>{
    try {
        const{id:curuser} = req.params;
        
        //find the user by id and exclude the password field from the response
        const user=await User.findById(curuser).select('-password');

        //user is not found
        if(!user){
            return res.status(404).json({message:"User not found."});
        }
        //successful response with required user data
        res.status(200).json({
            purchasePower: user.purchasePower,
            phoneNumber: user.phoneNumber,
            email: user.email,
            registrationDate: user.registrationDate,
            dob: user.DOB,
            monthlySalary: user.monthlySalary
        });
        
    } catch (error) {
        //error handle
        console.error("Error in getting User's data:", error);
        res.status(500).json({message:"Server error."});
    }
}