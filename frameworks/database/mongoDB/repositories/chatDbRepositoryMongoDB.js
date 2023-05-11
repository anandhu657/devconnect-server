import ChatModel from "../models/chat";

export default function chatDbRepositoryMongoDB() {
    const findAllMessages = (email) => {
        return ChatModel.find({ $or: [{ sender: email }, { recipient: email }] })
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    return {
        findAllMessages
    }
}