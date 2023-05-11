import QuestionModel from "../models/question";
import { ObjectId } from 'mongodb';

export default function questionRepositoryMongoDB() {
    const findAll = (id, pageSize, skip) => {
        return QuestionModel.find({ 'user': { $ne: new ObjectId(id) } })
            .populate('tags')
            .populate('user')
            .limit(pageSize)
            .skip(skip)
            .exec();
    }

    const count = (id) => {
        return QuestionModel.countDocuments({ 'user': { $ne: new ObjectId(id) } });
    };

    const create = (question) => {
        const newQuestion = {
            title: question.getTitle(),
            description: question.getDescription(),
            date: question.getDate(),
            user: question.getUser(),
            tags: question.getTags()
        };

        return QuestionModel.create(newQuestion);
    };

    const findById = (id) => {
        return QuestionModel
            .findOneAndUpdate({ _id: new ObjectId(id) }, { $inc: { views: 1 } })
            .populate('user')
            .populate('tags')
            .populate(
                {
                    path: 'comments.user',
                    select: 'username'
                }
            )
            .populate(
                {
                    path: 'answers.comments.user',
                    select: 'username'
                }
            )
            .populate(
                {
                    path: 'answers.user',
                    select: 'username profile_pic'
                }
            );
    }

    const findAllByProfileId = (id) => {
        return QuestionModel.find({ user: new ObjectId(id) }).sort({ date: -1 });
    }

    const updateLikeById = (id) => {
        return QuestionModel.updateOne({ _id: new ObjectId(id) }, { $inc: { likes: 1 } });
    }

    const updatedisLikeById = (id) => {
        return QuestionModel.updateOne({ _id: new ObjectId(id) }, { $inc: { likes: -1 } });
    }

    const findQuestionByTag = (tags, id) => {
        return QuestionModel
            .find({ user: { $ne: id }, tags: { $in: tags } })
            .sort({ date: -1 })
            .select('title')
            .limit(3);
    }

    const addComment = (question_id, userId, comment) => {
        const commentObject = {
            user: userId,
            comment: comment,
            created_at: new Date()
        }

        return QuestionModel.updateOne(
            { _id: new ObjectId(question_id) },
            { $push: { comments: commentObject } }
        );
    }

    const changeReportCount = async (id, value) => {
        const question = await QuestionModel.findById(id);
        question.reportCount += value;

        return await question.save();
    }

    const blockQuestionById = (questoinId) => {
        return QuestionModel
            .findOneAndUpdate(
                { _id: questoinId },
                [{ "$set": { status: { "$not": "$status" } } }]
            )
            .exec();
    }


    return {
        findAll,
        create,
        findById,
        findAllByProfileId,
        updateLikeById,
        updatedisLikeById,
        count,
        findQuestionByTag,
        addComment,
        changeReportCount,
        blockQuestionById
    }
}