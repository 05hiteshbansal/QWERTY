const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.registration = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    try {
        const user = await User.findOne({ email: email });
console.log(user)
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already Exist"
            });
        }
            encryptPassword = await bcrypt.hash(password, 10);
            const result = await User.create({ name, email, password: encryptPassword });
            result.password = undefined;
            const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
            return res.status(201).json({ success: true, token, result });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

};


exports.login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    try {

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User Not Found", success: false });
        }



        const decryptPassword = await bcrypt.compare(password, user.password);
        if (!decryptPassword) {
            return res.status(400).json({ message: "Invalid Credentials", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        user.password = undefined;
        return res.status(201).json({ success: true, token, user });

    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};
