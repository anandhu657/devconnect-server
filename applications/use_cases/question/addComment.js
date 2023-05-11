export default function addComment(question_id, userId, comment, dbRepository) {
    if (!question_id) {
        const error = new Error('question_id is required');
        error.statusCode = 401;
        throw error;
    }

    if (!comment) {
        const error = new Error('comment is required');
        error.statusCode = 401;
        throw error;
    }

    if (!userId) {
        const error = new Error('userid  is required');
        error.statusCode = 401;
        throw error;
    }

    return dbRepository.addComment(question_id, userId, comment).then((response) => {
        try {
            if (!response) {
                const error = new Error('No response found');
                error.statusCode = 401;
                throw error;
            }

            return response;
        } catch (error) {
            console.log(error);
        }
    })
}