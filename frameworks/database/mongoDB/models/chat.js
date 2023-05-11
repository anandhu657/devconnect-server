import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ChatSchema = new Schema({
    sender: {
        type: 'string',
        required: true
    },
    recipient: {
        type: 'string',
        required: true
    },
    text: {
        type: 'string',
        required: true
    },
    created: {
        type: Date,
        required: true
    }
});

const Message = mongoose.model("Message", ChatSchema);

export default Message;