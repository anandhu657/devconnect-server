import BlogModel from "../models/blog.js";
import { ObjectId } from 'mongodb';

export default function blogRepositoryMongoDB() {
    const findAll = (id) => {
        return BlogModel.aggregate([
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
        ])
    }

    const create = (blog) => {
        const newBlog = {
            title: blog.getTitle(),
            details: blog.getDetails(),
            date: blog.getDate(),
            user: blog.getUser()
        };

        return BlogModel.create(newBlog);
    }

    const findById = (id) => {
        return BlogModel.aggregate([
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
        ])
    }

    return {
        findAll,
        create,
        findById
    }
}