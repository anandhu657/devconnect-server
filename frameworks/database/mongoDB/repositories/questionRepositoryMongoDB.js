import QuestionModel from "../models/question"
import { ObjectId } from 'mongodb';

export default function questionRepositoryMongoDB() {
    const findAll = (id) => {
        return QuestionModel.aggregate([
            {
                '$match': {
                    'user': {
                        '$ne': new ObjectId(id)
                    }
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user',
                    'foreignField': '_id',
                    'as': 'result'
                }
            }, {
                '$unwind': {
                    'path': '$result'
                }
            }, {
                '$limit': 10
            }, {
                '$sort': {
                    'date': -1
                }
            }
        ]);
    }


    const create = (question) => {
        const newQuestion = {
            title: question.getTitle(),
            description: question.getDescription(),
            date: question.getDate(),
            user: question.getUser()
        };

        return QuestionModel.create(newQuestion);
    };

    const findById = (id) => {
        return QuestionModel.aggregate([
            {
                '$match': {
                    '_id': new ObjectId(id)
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user',
                    'foreignField': '_id',
                    'as': 'result'
                }
            }, {
                '$unwind': {
                    'path': '$result'
                }
            }
        ]);
    }
    return {
        findAll,
        create,
        findById
    }
}