export default async function changeReportValidById(reportId, dbRepository, blogRepository) {
    if (!reportId) {
        const error = new Error('Report Id is required');
        error.statusCode = 401;
        throw error;
    }

    return dbRepository.changeReportValidById(reportId).then((res) => {
        if (!res) {
            const error = new Error('Report not found');
            error.statusCode = 404;
            throw error;
        }

        if (res.valid) {
            return blogRepository.changeReportCount(res.content, -1);
        }

        if (!res.valid) {
            return blogRepository.changeReportCount(res.content, 1);
        }
    })
}