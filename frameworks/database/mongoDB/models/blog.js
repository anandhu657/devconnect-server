import mongoose from "mongoose";

const Schema = mongoose.Schema;
const BlogSchema = new Schema(
    {
        title: {
            type: 'string',
            required: true
        },
        details: {
            type: 'string',
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        likes: {
            type: Number,
            default: 0
        },
        likedBy: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'users'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users'
        },
        tags: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'tags'
        },
        savedBlogs: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'users'
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
);

const Blog = mongoose.model("blogs", BlogSchema);

export default Blog;