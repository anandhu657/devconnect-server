import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ReportSchema = new Schema({
    reportedItemType: {
        type: String,
        required: true,
        enum: ['questions', 'blogs', 'users'],
    },
    content: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'reportedItemType'
    },
    reporteduser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    reason: {
        type: String,
        required: true
    },
    valid: {
        type: Boolean,
        default: false
    },
    reportedDate: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true,
    },
});

const Reports = mongoose.model("reportedContent", ReportSchema);

export default Reports;