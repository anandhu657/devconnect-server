export default function fetchSavedBlogs(id, dbRepository) {
    if (!id) {
        const error = new Error('id is required');
        error.statusCode = 401;
        throw error;
    }

    return dbRepository.fetchSavedBlogs(id).then((blogs) => {
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