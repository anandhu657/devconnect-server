export default function likeBlogById(blogId, userId, blogRepository) {
    if (!blogId) {
        const error = new Error('blog id is required');
        error.statusCode = 401;
        throw error;
    }

    if (!userId) {
        const error = new Error('user id is required');
        error.statusCode = 401;
        throw error;
    }

    return blogRepository.likeBlogById(blogId, userId).then((res) => {
        try {
            return res;
        } catch (error) {
            console.log(error);
        }
    })
}