export default async function findBlogByTag(tags, id, blogRepository) {
    try {
        if (!id) {
            const error = new Error('id is required');
            error.statusCode = 401;
            throw error;
        }

        if (!tags) {
            const error = new Error('tags is required');
            error.statusCode = 401;
            throw error;
        }
    } catch (error) {
        console.log(error)
    }

    try {
        const blogs = await blogRepository.findBlogByTag(tags, id)
        if (blogs.length === 0) {
            const error = new Error('No blog found');
            error.statusCode = 401;
            throw error;
        }

        return blogs;

    } catch (error) {
        if (error.statusCode === 401) {
            const blogs = await blogRepository.findLatest(id)
            if (!blogs) {
                const error = new Error('No blogs found');
                error.statusCode = 401;
                throw error;
            }

            return blogs;
        }
    }
}