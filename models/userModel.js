const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:[true,"Please add your name"],
        },
        email:{
            type: String,
            required:[true,"Please add your email"],
        },
        password:{
            type: String,
            required:[true,"Please add your password"],
        }
    }
);
module.exports = mongoose.model("students" ,studentSchema);