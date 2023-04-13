export default function findAll(id, blogRepository) {
    if (!id) {
        const error = new Error('id is required');
        error.statusCode = 401;
        throw error;
    }

    return blogRepository.findAll(id).then((blogs) => {
        try {
            if (!blogs) {
                const error = new Error('No blogs found');
                error.statusCode = 401;
                throw error;
            }

            return blogs;
        } catch (error) {
            console.log(error);
        }
    })
}