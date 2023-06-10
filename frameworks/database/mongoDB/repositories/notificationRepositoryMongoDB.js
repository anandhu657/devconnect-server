import NotificationModel from "../models/notification"

export default function notificationDbRepositoryMongoDB() {
    const addNotification = (sender, receiver, questionId) => {
        const newNotification = new NotificationModel({
            sender: sender,
            receiver: receiver,
            questionId: questionId,
        });

        return newNotification.save().then((result) => {
            return NotificationModel
                .find({ _id: result._id })
                .populate(
                    {
                        path: 'sender',
                        select: 'username'
                    }
                )
                .populate(
                    {
                        path: 'receiver',
                        select: 'username'
                    }
                )
                .populate(
                    {
                        path: 'questionId',
                        select: 'title'
                    }
                )
        })
    }

    return {
        addNotification
    }
}