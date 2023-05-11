import reportEntity from '../../../entities/report';

export default function reportBlogById(blogId, userId, reason, dbRepository) {
    if (!blogId) {
        const error = new Error('Blog Id is required');
        error.statusCode = 401;
        throw error;
    }

    if (!userId) {
        const error = new Error('userId is required');
        error.statusCode = 401;
        throw error;
    }

    const newReport = reportEntity(blogId, userId, reason);

    return dbRepository.reportBlogById(newReport);
}