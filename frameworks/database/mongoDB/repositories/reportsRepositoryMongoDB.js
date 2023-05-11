import ReportsModel from "../models/reports";

export default function abuseReportRepository() {
    const reportQuestionById = (reportedContent) => {
        const newReport = new ReportsModel({
            reportedItemType: 'questions',
            content: reportedContent.getContent(),
            reporteduser: reportedContent.getUser(),
            reason: reportedContent.getReason(),
            type: 'question'
        });

        return newReport.save();
    }

    const reportBlogById = (reportedContent) => {
        const newReport = new ReportsModel({
            reportedItemType: 'blogs',
            content: reportedContent.getContent(),
            reporteduser: reportedContent.getUser(),
            reason: reportedContent.getReason(),
            type: 'blog'
        });

        return newReport.save();
    }

    const reportUserById = (reportedContent) => {

        const newReport = new ReportsModel({
            reportedItemType: 'users',
            content: reportedContent.getContent(),
            reporteduser: reportedContent.getUser(),
            reason: reportedContent.getReason(),
            type: 'user'
        });

        return newReport.save();
    }

    const fetchAllUserReports = () => {
        return ReportsModel
            .find({ type: 'user' })
            .populate('content', 'email reportCount')
            .exec();
    }

    const fetchUserReportsById = (userId) => {
        return ReportsModel
            .find({ content: userId, valid: true, type: 'user' })
            .populate('content', 'email reportCount status')
            .populate('reporteduser', 'email')
            .exec();
    }

    const changeReportValidById = (reportId) => {
        return ReportsModel
            .findOneAndUpdate(
                { _id: reportId },
                [{ "$set": { valid: { "$not": "$valid" } } }]
            )
            .exec();
    }

    const fetchAllQuestionReports = () => {
        return ReportsModel
            .find({ type: 'question' })
            .populate('content', 'title reportCount')
            .exec();
    }

    const fetchQuestionReportsById = (questionId) => {
        return ReportsModel
            .find({ content: questionId, valid: true, type: 'question' })
            .populate('content', 'title reportCount status description')
            .populate('reporteduser', 'email')
            .exec();
    }

    const fetchAllBlogReports = () => {
        return ReportsModel
            .find({ type: 'blog' })
            .populate('content', 'title reportCount')
            .exec();
    }

    const fetchBlogReportsById = (blogId) => {
        return ReportsModel
            .find({ content: blogId, valid: true, type: 'blog' })
            .populate('content', 'title reportCount status details')
            .populate('reporteduser', 'email')
            .exec();
    }


    return {
        reportQuestionById,
        reportBlogById,
        reportUserById,
        fetchUserReportsById,
        fetchAllUserReports,
        changeReportValidById,
        fetchAllQuestionReports,
        fetchQuestionReportsById,
        fetchAllBlogReports,
        fetchBlogReportsById
    }
}