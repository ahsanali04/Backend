import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    subscripber:{
        type:Schema.Types.ObjectId, //who is subscribing
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId, //whom subscriber is subscribing
        ref:"User"
    }
},{timestamps:true});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
