import mongoose from "mongoose";

const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
    title: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    tags: {
        type: [mongoose.Schema.Types.ObjectId],
    },
    likes: {
        type: Number,
    },
    dislikes: {
        type: Number,
    },
    views: {
        type: Number,
    },
    date: {
        type: Date,
        required: true
    },
    answers: {
        type: [mongoose.Schema.Types.ObjectId],
    },
    closed: {
        type: Boolean,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Question = mongoose.model("questions", QuestionSchema);

export default Question;