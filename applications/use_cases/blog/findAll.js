export default function findAll(id, pageSize, skip, filter, sort, blogRepository) {
    if (!id) {
        const error = new Error('id is required');
        error.statusCode = 401;
        throw error;
    }

    return blogRepository.findAll(id, pageSize, skip, filter, sort).then((blogs) => {
        try {
            if (!blogs) {
                const error = new Error('No blogs found');
                error.statusCode = 401;
                throw error;
            }

            blogs.forEach(blog => {
                blog.details = blog.details.slice(0, 200);
            });

            return blogs;
        } catch (error) {
            console.log(error);
        }
    })
}