import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

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

        res.status(201).json({ savedUser });
    } catch (error) {

        res.status(500).json({ err: error.message });
    }
};
