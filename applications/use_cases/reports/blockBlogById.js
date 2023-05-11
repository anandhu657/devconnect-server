export default function blockBlogById(blogId, blogRepository) {

    if (!blogId) {
        const error = new Error('blogId is required');
        error.statusCode = 401;
        throw error;
    }

    return blogRepository.blockBlogById(blogId).then((res) => {
        if (res.status)
            return { status: false };
        else
            return { status: true };
    })
}