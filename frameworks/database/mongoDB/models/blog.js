import mongoose from "mongoose";

const Schema = mongoose.Schema;
const BlogSchema = new Schema({
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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tags: {
        type: [mongoose.Schema.Types.ObjectId],
    }
});

const Blog = mongoose.model("blogs", BlogSchema);

export default Blog;