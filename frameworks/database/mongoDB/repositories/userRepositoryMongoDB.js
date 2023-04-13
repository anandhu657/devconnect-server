import UserModel from '../models/user.js';

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

    const findById = (id) => UserModel.findById(id);

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

    return {
        findByEmail,
        add,
        findById,
        updateByEmail
    }
}