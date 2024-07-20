import User from "../models/user.models.js";

export const UserData = async (req,res) =>{
    try {
        const{id:curuser} = req.params;
        const user=await User.findById(curuser).select('-password');

        if(!user){
            return res.status(404).json({message:"User not found."});
        }

        res.status(200).json({
            purchasePower: user.purchasePower,
            phoneNumber: user.phoneNumber,
            email: user.email,
            registrationDate: user.registrationDate,
            dob: user.DOB,
            monthlySalary: user.monthlySalary
        });
        
    } catch (error) {
        console.error("Error in getting User's data:", error);
        res.status(500).json({message:"Server error."});
    }
}