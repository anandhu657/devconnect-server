import blog from "../../../../entities/blog.js";
import BlogModel from "../models/blog.js";
import { ObjectId } from 'mongodb';

export default function blogRepositoryMongoDB() {
    const findAll = (id, pageSize, skip) => {
        return BlogModel
            .find({ 'user': { $ne: id } })
            .populate('tags')
            .populate(
                {
                    path: 'user',
                    select: 'username profile_pic'
                }
            )
            .limit(pageSize)
            .skip(skip)
            .exec();
    }

    const create = (blog) => {
        const newBlog = {
            title: blog.getTitle(),
            details: blog.getDetails(),
            date: blog.getDate(),
            user: blog.getUser(),
            tags: blog.getTags()
        };

        return BlogModel.create(newBlog);
    }

    const findById = (id) => {
        return BlogModel
            .findById(id)
            .populate(
                {
                    path: 'user',
                    select: 'username profile_pic about'
                }
            )
            .populate('tags')
            .exec();
    }

    const findLatest = (id) => {
        return BlogModel
            .find({ 'user': { $ne: new ObjectId(id) } })
            .select('title')
            .sort({ date: -1 })
            .limit(5)
    }

    const findBlogByTag = (tags, id) => {
        return BlogModel
            .find({ user: { $ne: id }, tags: { $in: tags } })
            .sort({ date: -1 })
            .select('title')
            .limit(3);
    }

    const likeBlogById = async (blogId, userId) => {
        const blog = await BlogModel.findById(blogId);

        if (blog.likedBy.includes(userId)) {
            blog.likedBy.pull(userId);
            blog.likes -= 1;
        } else {
            blog.likedBy.push(userId);
            blog.likes += 1;
        }
        return await blog.save();
    }

    const saveBlog = async (blogId, userId) => {
        const blog = await BlogModel.findById(blogId);

        if (blog.savedBlogs.includes(userId)) {
            blog.savedBlogs.pull(userId);
        } else {
            blog.savedBlogs.push(userId);
        }
        return await blog.save();
    }

    const count = (id) => {
        return BlogModel.countDocuments({ 'user': { $ne: new ObjectId(id) } });
    }

    const fetchUserBlogs = (id) => {
        return BlogModel
            .find({ user: new ObjectId(id) })
            .select('title date likes tags')
            .populate('tags')
            .sort({ date: -1 });
    }

    const changeReportCount = async (id, value) => {
        const blog = await BlogModel.findById(id);
        blog.reportCount += value;

        return await blog.save();
    }

    const blockBlogById = (blogId) => {
        return BlogModel
            .findOneAndUpdate(
                { _id: blogId },
                [{ "$set": { status: { "$not": "$status" } } }]
            )
            .exec();
    }

    return {
        findAll,
        create,
        findById,
        findLatest,
        findBlogByTag,
        likeBlogById,
        saveBlog,
        count,
        fetchUserBlogs,
        changeReportCount,
        blockBlogById
    }
}
