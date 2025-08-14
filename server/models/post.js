import { Schema, model } from "mongoose";

const postSchema = Schema({
    description: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map, // more effiecent than array O(1) vs O(n)
        of: Boolean
    }, 
    comments: {
        type: Array,
        default: []
    }
}, { timestamps: true })

export default model('post', postSchema)