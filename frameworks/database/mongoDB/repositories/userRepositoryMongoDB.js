import UserModel from '../models/user.js';
import { ObjectId } from 'mongodb';

export default function userRepositoryMongoDB() {
    const findByEmail = (email) => UserModel.findOne({ email: email })

    const add = (user) => {
        const newUser = new UserModel({
            username: user.getUserName(),
            email: user.getEmail(),
            profile_pic: user.getProfilePic(),
            date: user.getDate(),
        });

        return newUser.save();
    }

    const findById = (id) => UserModel.findById(id)

    const updateByEmail = (email, user) => {

        const updatedUser = {
            title: user.getTitle(),
            about: user.getAbout(),
            gitlink: user.getGitLink(),
            linkinlink: user.getLinkedInLink(),
            personalWeblink: user.getPersonalWebLink(),
        };

        return UserModel.updateOne(
            { email: email },
            { $set: updatedUser },
        );
    }

    const updateLikeById = (id) => {
        return UserModel.updateOne({ _id: new ObjectId(id) }, { $addToSet: { likes: new ObjectId(id) } });
    }

    const updatedisLikeById = (id) => {
        return UserModel.updateOne({ _id: new ObjectId(id) }, { $pull: { likes: new ObjectId(id) } });
    }

    const findAllUsers = (id) => {
        return UserModel.find({ _id: { $ne: new ObjectId(id) } });
    }

    const addConnectionRequest = async (sender, receiver) => {
        const senderData = await UserModel.findById(sender);
        const receiverData = await UserModel.findById(receiver);

        const receiverObject = {
            user: sender,
            status: 'Requested'
        }

        const senderObject = {
            user: receiver,
            status: 'Connect Back'
        }
        senderData.connections.push(senderObject);
        receiverData.connections.push(receiverObject);

        await senderData.save();
        await receiverData.save();
        return;
    }

    const acceptConnectionRequest = async (sender, receiver) => {
        const senderData = await UserModel
            .updateOne(
                {
                    _id: new ObjectId(sender),
                    "connections.user": new ObjectId(receiver)
                },
                {
                    $set: { "connections.$.status": "Connected" },
                    $inc: { connectionsCount: 1 }
                }
            );

        const receiverData = await UserModel
            .updateOne(
                {
                    _id: new ObjectId(receiver),
                    "connections.user": new ObjectId(sender)
                },
                {
                    $set: { "connections.$.status": "Connected" },
                    $inc: { connectionsCount: 1 }
                }
            );

        return;
    }

    const disConnectRequest = async (sender, receiver) => {
        const senderData = await UserModel
            .updateOne(
                { _id: new ObjectId(sender) },
                { $pull: { connections: { user: new ObjectId(receiver) } } }
            );
        const receiverData = await UserModel
            .updateOne(
                { _id: new ObjectId(receiver) },
                { $pull: { connections: { user: new ObjectId(sender) } } }
            );

        return;
    }

    const saveBlog = async (blogId, userId) => {
        const user = await UserModel.findById(userId);

        if (user.savedBlogs.includes(blogId)) {
            user.savedBlogs.pull(blogId);
        } else {
            user.savedBlogs.push(blogId);
        }
        return await user.save();
    }

    const fetchSavedBlogs = (id) => {
        return UserModel
            .findById(id)
            .populate(
                {
                    path: 'savedBlogs',
                    select: 'title date',
                    populate: {
                        path: 'user',
                        select: 'username profile_pic'
                    }
                }
            )
            .select('savedBlogs');
    }

    const changeReportCount = async (id, value) => {
        const user = await UserModel.findById(id);
        user.reportCount += value;

        return await user.save();
    }

    const blockUserById = (userId) => {
        return UserModel
            .findOneAndUpdate(
                { _id: userId },
                [{ "$set": { status: { "$not": "$status" } } }]
            )
            .exec();
    }

    return {
        findByEmail,
        add,
        findById,
        updateByEmail,
        updateLikeById,
        updatedisLikeById,
        findAllUsers,
        addConnectionRequest,
        acceptConnectionRequest,
        disConnectRequest,
        saveBlog,
        fetchSavedBlogs,
        changeReportCount,
        blockUserById
    }
}