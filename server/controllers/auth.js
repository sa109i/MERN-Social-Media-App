import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
// import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            friends,
            picturePath,
            location,
            occupation,
        } = req.body;

        console.log(req.body)

        
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const savedUser = new User({
            firstName,
            lastName,
            email,
            friends, 
            password: passwordHash,
            picturePath,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        });

        await savedUser.save();

        console.log(savedUser)

        res.status(201).json({ savedUser });

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const {
            password, 
            email
        } = req.body

        const foundUser = await User.findOne({ email })

        if(!foundUser) return res.status(400).json({ msg: "user not found!" })
        
        const isMatch = await bcrypt.compare(password, foundUser.password)

        if (!isMatch) return res.status(400).json({ msg: "user found, password wrong!" })

        const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET)

        res.status(200).json({ 
            msg: "user logged in", 
            user: foundUser,
            token
        })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}