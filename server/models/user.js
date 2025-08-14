import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    friends: {
        type: Array,
        default: []
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    picturePath: {
        type: String,
        default: ""
    },
    location: {
        type: String,
    },
    occupation: {
        type: String,
    },
    viewedProfile: {
        type: Number,
    },
    impressions: {
        type: Number,
    }
}, { timestamps: true })

export default model('user', UserSchema)
