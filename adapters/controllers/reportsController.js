import fetchAllUserReports from '../../applications/use_cases/reports/fetchAllUserReports';
import fetchAllBlogReports from '../../applications/use_cases/reports/fetchAllBlogReports';
import fetchAllQuestionReports from '../../applications/use_cases/reports/fetchAllQuestionReports';
import reportQuestionById from '../../applications/use_cases/reports/reportQuestionById';
import reportBlogById from '../../applications/use_cases/reports/reportBlogById';
import reportUserById from '../../applications/use_cases/reports/reportUserById';
import changeReportValidById from '../../applications/use_cases/reports/changeReportValidById';
import fetchUserReportsById from '../../applications/use_cases/reports/fetchUserReportsById';
import blockUserById from '../../applications/use_cases/reports/blockUserById';
import fetchQuestionReportsById from '../../applications/use_cases/reports/fetchQuestionReportsById';
import changeQuestionReportValidById from '../../applications/use_cases/reports/changeQuestionReportValidById';
import changeBlogReportValidById from '../../applications/use_cases/reports/changeBlogReportValid';
import fetchBlogReportsById from '../../applications/use_cases/reports/fetchBlogReportsById';
import blockBlogById from '../../applications/use_cases/reports/blockBlogById';
import blockQuestionById from '../../applications/use_cases/reports/blockQuestionById';

export default function abuseReportController(
    abuseReportDbRepository,
    abuseReportDbRepositoryImpl,
    userDbRepository,
    userDbRepositoryImpl,
    questionDbRepository,
    questionDbRepositoryImpl,
    blogDbRepository,
    blogDbRepositoryImpl
) {
    const dbRepository = abuseReportDbRepository(abuseReportDbRepositoryImpl());
    const userRepository = userDbRepository(userDbRepositoryImpl());
    const questionRepository = questionDbRepository(questionDbRepositoryImpl());
    const blogRepository = blogDbRepository(blogDbRepositoryImpl());

    const getAllUserReports = (req, res) => {
        fetchAllUserReports(dbRepository)
            .then((reports) => res.json(reports))
            .catch((err) => console.log(err))
    }

    const getUserReports = (req, res) => {
        const { userId } = req.params;

        fetchUserReportsById(userId, dbRepository)
            .then((reports) => res.json(reports))
            .catch((err) => console.log(err))
    }

    const getAllBlogReports = (req, res) => {
        fetchAllBlogReports(dbRepository)
            .then((reports) => res.json(reports))
            .catch((err) => console.log(err))
    }

    const getAllQuestionReports = (req, res) => {
        fetchAllQuestionReports(dbRepository)
            .then((reports) => res.json(reports))
            .catch((err) => console.log(err))
    }

    const reportQuestion = (req, res) => {
        const { questionId, reason } = req.body;
        const userId = req.decodeToken.user.id;

        reportQuestionById(questionId, userId, reason, dbRepository)
            .then(() => res.json({ success: true }))
            .catch((err) => console.log(err))
    }

    const reportBlog = (req, res) => {
        const { blogId, reason } = req.body;
        const userId = req.decodeToken.user.id;

        reportBlogById(blogId, userId, reason, dbRepository)
            .then(() => res.json({ success: true }))
            .catch((err) => console.log(err))
    }

    const reportUser = (req, res) => {
        const { userId, reason } = req.body;
        const reportedUser = req.decodeToken.user.id;

        reportUserById(userId, reportedUser, reason, dbRepository)
            .then(() => res.json({ success: true }))
            .catch((err) => console.log(err))
    }

    const changeReportValid = (req, res) => {
        const { reportId } = req.body;

        changeReportValidById(reportId, dbRepository, userRepository)
            .then(() => res.json({ success: true }))
            .catch((err) => console.log(err))
    }

    const blockUser = (req, res) => {
        const { userId } = req.body;

        blockUserById(userId, userRepository)
            .then((response) => res.json(response))
            .catch((err) => console.log(err))
    }

    const getQuestionReports = (req, res) => {
        const { questionId } = req.params;

        fetchQuestionReportsById(questionId, dbRepository)
            .then((reports) => res.json(reports))
            .catch((err) => console.log(err))
    }

    const changeQuestionReportValid = (req, res) => {
        const { reportId } = req.body;

        changeQuestionReportValidById(reportId, dbRepository, questionRepository)
            .then(() => res.json({ success: true }))
            .catch((err) => console.log(err))
    }

    const changeBlogReportValid = (req, res) => {
        const { reportId } = req.body;

        changeBlogReportValidById(reportId, dbRepository, blogRepository)
            .then(() => res.json({ success: true }))
            .catch((err) => console.log(err))
    }

    const getBlogReports = (req, res) => {
        const { blogId } = req.params;

        fetchBlogReportsById(blogId, dbRepository)
            .then((reports) => res.json(reports))
            .catch((err) => console.log(err))
    }

    const blockBlog = (req, res) => {
        const { blogId } = req.body;

        blockBlogById(blogId, blogRepository)
            .then((response) => res.json(response))
            .catch((err) => console.log(err))
    }

    const blockQuestion = (req, res) => {
        const { questionId } = req.body;

        blockQuestionById(questionId, questionRepository)
            .then((response) => res.json(response))
            .catch((err) => console.log(err))
    }

    return {
        getAllUserReports,
        getUserReports,
        getAllBlogReports,
        getAllQuestionReports,
        reportQuestion,
        reportBlog,
        reportUser,
        changeReportValid,
        blockUser,
        getQuestionReports,
        changeQuestionReportValid,
        changeBlogReportValid,
        getBlogReports,
        blockBlog,
        blockQuestion
    }
}