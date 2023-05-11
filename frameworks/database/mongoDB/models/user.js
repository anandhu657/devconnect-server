import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
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
        connections: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users'
                },
                status: {
                    type: String,
                }
            }
        ],
        connectionsCount: {
            type: Number,
            default: 0
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
        likes: {
            type: Array,
        },
        savedBlogs: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'blogs'
        },
        status: {
            type: Boolean,
            default: true
        },
        reportCount: {
            type: Number,
            default: 0
        }
    }
)

const User = mongoose.model("users", UserSchema);

export default User;