import mongoose from "mongoose";

const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'questions'
    },
    created: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;