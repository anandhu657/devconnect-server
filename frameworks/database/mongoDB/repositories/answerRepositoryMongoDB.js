import QuestionModel from "../models/question";
import { ObjectId } from "mongodb";

export default function answerDbRepositoryMongoDb() {
    const create = (question_id, answer) => {
        const newAnswer = {
            answer: answer.getAnswer(),
            user: new ObjectId(answer.getUser()),
            date: answer.getDate(),
        };

        return QuestionModel.updateOne(
            { _id: new ObjectId(question_id) },
            { $push: { answers: newAnswer } }
        )
    }

    const addComment = (questionId, answerId, userId, comment) => {
        const commentObject = {
            comment: comment,
            created_at: new Date(),
            user: userId
        }

        return QuestionModel
            .updateOne(
                {
                    _id: questionId,
                    "answers._id": answerId
                },
                {
                    $push: {
                        "answers.$.comments": commentObject
                    }
                }
            );
    }

    const acceptAnswer = (questionId, answerId) => {
        return QuestionModel
            .updateOne(
                {
                    _id: questionId,
                    "answers._id": answerId
                },
                {
                    $set: {
                        "acceptedAnswer": answerId,
                        "answers.$.accepted": true
                    }
                }
            );
    }

    const addLikeAnswer = (questionId, answerId, userId) => {
        return QuestionModel
            .updateOne(
                {
                    _id: questionId,
                    "answers._id": answerId
                },
                {
                    $addToSet: {
                        "answers.$.likedusers": userId
                    },
                    $pull: {
                        "answers.$.dislikedusers": userId
                    }
                }
            );
    }

    const addDislikeAnswer = (questionId, answerId, userId) => {
        return QuestionModel
            .updateOne(
                {
                    _id: questionId,
                    "answers._id": answerId
                },
                {
                    $addToSet: {
                        "answers.$.dislikedusers": userId
                    },
                    $pull: {
                        "answers.$.likedusers": userId
                    }
                }
            );
    }


    return {
        create,
        addComment,
        acceptAnswer,
        addLikeAnswer,
        addDislikeAnswer
    }
}
