export default function fetchBlogReportsById(blogId, dbRepository) {

    if (!blogId) {
        const error = new Error('blogId is required');
        error.statusCode = 401;
        throw error;
    }

    return dbRepository.fetchBlogReportsById(blogId);
}