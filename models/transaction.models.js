import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    amount:{
        type:Number,
        required:true
    },
    transactionType:{
        type: String,
        enum: ["repayment","borrow"],
        required:true
    },
    interestRate:{
        type:Number,
        default:0.08
    },
    totalRepayment:{
        type:Number,
        required:true
    },
    monthlyRepayment:{
        type:Number,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
},{ timestamps:true});
const Transaction= mongoose.model("Transaction",transactionSchema);

export default Transaction;