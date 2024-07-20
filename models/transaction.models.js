import mongoose from "mongoose";  //to interact with MongoDB

//schema for transactions
const transactionSchema = new mongoose.Schema({
    //user reference who made the transaction
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
},{ timestamps:true}); //adds createdAt,updatedAt fields automatically

//create a model using transaction schema
const Transaction= mongoose.model("Transaction",transactionSchema);

export default Transaction;