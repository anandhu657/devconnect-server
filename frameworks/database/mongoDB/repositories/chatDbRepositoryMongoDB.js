import ChatModel from "../models/chat";

export default function chatDbRepositoryMongoDB() {
    const findAllMessages = (senderEmail, recipientEmail) => {
        // return ChatModel.find({ $or: [{ sender: email }, { recipient: email }] })
        return ChatModel.find(
            {
                $and: [
                    { $or: [{ sender: senderEmail }, { sender: recipientEmail }] },
                    { $or: [{ recipient: senderEmail }, { recipient: recipientEmail }] }
                ]
            }
        )
    }

    return {
        findAllMessages
    }
}