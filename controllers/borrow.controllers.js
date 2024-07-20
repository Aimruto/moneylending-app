import User from "../models/user.models.js";
import Transaction from "../models/transaction.models.js";

//function handles money borrow
export const moneyBorrow = async(req,res)=>{
    const { amount } = req.body;
    //user id from the request parameters
    const{id:curruserId} = req.params;
    try {
        const user=await User.findById(curruserId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        // amount validation
        if(amount <= 0 ||amount===undefined){
            return res.status(400).json(({message: "amount should ne a positive number."}));
        }

        //checks if user has enough purchase power
        if(user.purchasePower<amount){
            return res.status(400).json({message: "Insufficient purchase power"});
        }

        //repayment calculation
        const interestRate=0.08;
        const tenure=12; //in months
        const totalRepayment=amount* (1+interestRate); //for 12 months
        const monthlyRepayment=totalRepayment/tenure;


        //update the purchase power
        user.purchasePower=user.purchasePower-amount;

        //save the updated purchase power
        await user.save();

        //create new transaction record for borrowing
        const transaction = new Transaction({
            curruserId,
            amount,
            transactionType:"borrow",
            interestRate,
            totalRepayment,
            monthlyRepayment
        });
        //save the transaction record
        await transaction.save();

        //success response message
        res.status(200).json({
            message:"User borrow was successful.",
            currPurchasePower:user.purchasePower,
            amountBorrowed:amount,
            monthlyRepaymentamount:monthlyRepayment
        });

    } catch (error) {
        //error handle
        console.error("borrow error:", error);
        res.status(500).json({message: "sever error."});
    }


}