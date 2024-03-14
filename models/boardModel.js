const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
    {
        secret: {
            type: String,
            required:[true,"Please enter a secret to create a Board"],
        },
        number:{
            type:Number,
            default:0
       },
        students:[{
            type:mongoose.Schema.ObjectId,
            ref:'students'
            //type:String
        }]
        
    }
);
module.exports = mongoose.model("boards" ,boardSchema);