export default function abuseReportRepository(repository) {
    const reportQuestionById = (reportedContent) => repository.reportQuestionById(reportedContent);
    const reportBlogById = (reportedContent) => repository.reportBlogById(reportedContent);
    const reportUserById = (reportedContent) => repository.reportUserById(reportedContent);
    const fetchAllUserReports = () => repository.fetchAllUserReports();
    const fetchUserReportsById = (userId) => repository.fetchUserReportsById(userId);
    const fetchAllBlogReports = () => repository.fetchAllBlogReports();
    const fetchAllQuestionReports = () => repository.fetchAllQuestionReports();
    const fetchQuestionReportsById = (questionId) => repository.fetchQuestionReportsById(questionId);
    const changeReportValidById = (reportId) => repository.changeReportValidById(reportId);
    const fetchBlogReportsById = (blogId) => repository.fetchBlogReportsById(blogId);

    return {
        fetchAllUserReports,
        fetchUserReportsById,
        fetchAllBlogReports,
        fetchAllQuestionReports,
        reportQuestionById,
        reportBlogById,
        reportUserById,
        changeReportValidById,
        fetchQuestionReportsById,
        fetchBlogReportsById
    }
}