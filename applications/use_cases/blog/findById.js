export default function findById(id, blogRepository) {
    if (!id) {
        const error = new Error('id is required');
        error.statusCode = 401;
        throw error;
    }
    return blogRepository.findById(id).then((blog) => {
        try {
            if (!blog) {
                const error = new Error('No blog found');
                error.statusCode = 401;
                throw error;
            }

            return blog;
        } catch (error) {
            console.log(error);
        }
    })
}