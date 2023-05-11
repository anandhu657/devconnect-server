import mongoose from "mongoose";

const Schema = mongoose.Schema;
const QuestionSchema = new Schema(
    {
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
            ref: 'tags'
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
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users'
                },
                comment: {
                    type: String
                },
                created_at: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        answers: [
            {
                answer: {
                    type: String
                },
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users'
                },
                date: {
                    type: Date,
                    default: Date.now
                },
                comments: [
                    {
                        comment: {
                            type: String
                        },
                        created_at: {
                            type: Date,
                            default: Date.now
                        },
                        user: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'users'
                        }
                    }
                ]
            }
        ],
        closed: {
            type: Boolean,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
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

const Question = mongoose.model("questions", QuestionSchema);

export default Question;