import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    profile_pic: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    connections: {
        type: String
    },
    about: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    socialLinks: {
        type: Object,
    },
    interested_tags: {
        type: String,
    },
    not_interested_tags: {
        type: String,
    },
})

const User = mongoose.model("users", UserSchema);

export default User;